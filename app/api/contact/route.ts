import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Replaces the old submit.php handler. Validates and rate-limits contact
// form submissions. Email delivery is pluggable: set RESEND_API_KEY (and
// CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL) in your environment to actually
// send mail via Resend (https://resend.com). Without a key configured the
// route still validates submissions and logs them server-side, so the form
// works end-to-end in development.

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long"),
});

const SPAM_KEYWORDS = [
  "viagra",
  "casino",
  "lottery",
  "winner",
  "congratulations",
  "click here",
  "free money",
];

// Simple in-memory rate limiter (per server instance). Good enough for a
// low-traffic marketing site; swap for a durable store (Upstash, DB, etc.)
// if you deploy behind multiple serverless instances.
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

async function sendEmail(payload: z.infer<typeof contactSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Not configured yet — log instead of sending so local/dev
    // submissions don't silently disappear.
    console.info("[contact] RESEND_API_KEY not set, logging submission:", payload);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `[Contact Form] ${payload.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <p><strong>Message:</strong><br/>${payload.message.replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Email provider error: ${errText}`);
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const fullText = `${data.name} ${data.email} ${data.subject} ${data.message}`.toLowerCase();
  if (SPAM_KEYWORDS.some((keyword) => fullText.includes(keyword))) {
    return NextResponse.json(
      { success: false, message: "Message appears to be spam" },
      { status: 400 }
    );
  }

  try {
    await sendEmail(data);
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Thank you for your message! We will get back to you within 24 hours.",
  });
}
