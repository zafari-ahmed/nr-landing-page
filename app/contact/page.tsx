import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { siteConfig } from "@/lib/site-config";

const title = "Contact Us | Get a Construction Consultation";
const description =
  "Contact NR & Associates for airport construction, runway development, and civil engineering inquiries. Call +92-300-2252080 or send us a message.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: `${siteConfig.url}/contact`,
    title,
    description,
  },
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
