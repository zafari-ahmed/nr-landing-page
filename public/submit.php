<?php
/**
 * Contact form handler for the NR & Associates site.
 *
 * The site is a Next.js static export (output: 'export'), so there is no Node
 * server at runtime and app/api/* route handlers are never deployed. This
 * file lives in public/, which Next copies verbatim into out/, so after you
 * upload out/ to public_html on cPanel it is served at /submit.php and run by
 * Apache's PHP handler.
 *
 * Responds with the same JSON shape the form expects:
 *   success: { "success": true,  "message": "..." }
 *   failure: { "success": false, "message": "...", "errors": ["..."] }
 */

declare(strict_types=1);

// ---------------------------------------------------------------------------
// CONFIGURATION — change these after deploying to cPanel.
// ---------------------------------------------------------------------------

/** Where enquiries are delivered. Put your real inbox here. */
const CONTACT_TO = 'admin@nr-associates.com';

/**
 * The From address. For mail to survive SPF/DKIM it MUST be a mailbox on the
 * site's own domain, created in cPanel › Email Accounts. Never use the
 * visitor's address here — that is what Reply-To is for.
 */
const CONTACT_FROM = 'no-reply@nr-associates.com';

/** Shown in the email subject and body. */
const SITE_NAME = 'NR & Associates';

/** Prefix on the subject line, so inbox filters can catch these. */
const SUBJECT_PREFIX = '[Contact Form]';

/** Send the visitor a "we got your message" auto-reply. Set to false to disable. */
const SEND_AUTO_REPLY = true;

/** Keep a local copy of each submission, in case mail delivery fails. */
const LOG_SUBMISSIONS = true;

/** Rate limit: at most RATE_MAX submissions per IP per RATE_WINDOW seconds. */
const RATE_WINDOW = 300;
const RATE_MAX = 3;

/** Reject obvious junk. */
const SPAM_KEYWORDS = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'free money', 'crypto investment', 'seo services',
];

// ---------------------------------------------------------------------------
// Nothing below here needs editing.
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
// No Access-Control-Allow-Origin: the form is same-origin, so allowing other
// sites to POST here would only let them use this script as a mail relay.

/** Emit a JSON response and stop. */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Collapse a value to a single trimmed line. Mail headers are newline
 * delimited, so any value that reaches a header must have CR/LF and other
 * control characters stripped or it can be used to inject extra headers.
 */
function single_line(mixed $value): string
{
    if (!is_scalar($value)) {
        return '';
    }
    return trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string) $value) ?? '');
}

/** Trim a multi-line value, keeping newlines but dropping other control chars. */
function multi_line(mixed $value): string
{
    if (!is_scalar($value)) {
        return '';
    }
    $clean = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', (string) $value);
    return trim(str_replace("\r\n", "\n", $clean ?? ''));
}

/** RFC 2047 encode a header value so non-ASCII subjects survive transit. */
function encode_header(string $value): string
{
    return preg_match('/[\x80-\xFF]/', $value) === 1
        ? '=?UTF-8?B?' . base64_encode($value) . '?='
        : $value;
}

/** Escape for inclusion in an HTML email body. */
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** A writable directory OUTSIDE the document root, so logs are not downloadable. */
function private_dir(): string
{
    $dir = sys_get_temp_dir();
    return is_dir($dir) && is_writable($dir) ? $dir : '';
}

/** True when this IP has already used up its allowance. */
function is_rate_limited(string $ip): bool
{
    $dir = private_dir();
    if ($dir === '') {
        return false; // Can't track it; don't lock legitimate visitors out.
    }

    $file = $dir . '/nr-contact-' . hash('sha256', $ip) . '.json';
    $now = time();
    $stamps = [];

    if (is_readable($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            foreach ($decoded as $stamp) {
                if (is_int($stamp) && ($now - $stamp) < RATE_WINDOW) {
                    $stamps[] = $stamp;
                }
            }
        }
    }

    if (count($stamps) >= RATE_MAX) {
        return true;
    }

    $stamps[] = $now;
    @file_put_contents($file, json_encode($stamps), LOCK_EX);
    return false;
}

/** Append a submission to a private log file. Never fatal. */
function log_submission(array $row): void
{
    if (!LOG_SUBMISSIONS) {
        return;
    }
    $dir = private_dir();
    if ($dir === '') {
        return;
    }
    @file_put_contents(
        $dir . '/nr-contact-submissions.log',
        '[' . date('Y-m-d H:i:s') . '] ' . json_encode($row, JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );
}

/** Send one HTML email. Returns whether the MTA accepted it. */
function send_html_mail(string $to, string $subject, string $html, ?string $replyTo = null): bool
{
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: ' . encode_header(SITE_NAME) . ' <' . CONTACT_FROM . '>',
    ];
    if ($replyTo !== null && $replyTo !== '') {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    $headers[] = 'X-Mailer: PHP/' . PHP_VERSION;

    // -f sets the envelope sender, which keeps cPanel's MTA from rewriting it
    // to the Apache user and tripping SPF checks.
    return mail(
        $to,
        encode_header($subject),
        $html,
        implode("\r\n", $headers),
        '-f' . CONTACT_FROM
    );
}

// --- request handling ------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed']);
}

// The form posts JSON; also accept urlencoded/multipart so the endpoint still
// works from a plain HTML <form> without JavaScript.
$input = [];
$raw = file_get_contents('php://input');
if (is_string($raw) && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}
if ($input === [] && $_POST !== []) {
    $input = $_POST;
}

$name    = single_line($input['name'] ?? '');
$email   = single_line($input['email'] ?? '');
$subject = single_line($input['subject'] ?? '');
$message = multi_line($input['message'] ?? '');

$errors = [];

if (mb_strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters long';
} elseif (mb_strlen($name) > 100) {
    $errors[] = 'Name is too long';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address';
}

if (mb_strlen($subject) < 5) {
    $errors[] = 'Subject must be at least 5 characters long';
} elseif (mb_strlen($subject) > 200) {
    $errors[] = 'Subject is too long';
}

if (mb_strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters long';
} elseif (mb_strlen($message) > 5000) {
    $errors[] = 'Message is too long';
}

if ($errors !== []) {
    respond(400, [
        'success' => false,
        'message' => 'Validation failed',
        'errors'  => $errors,
    ]);
}

$haystack = mb_strtolower($name . ' ' . $email . ' ' . $subject . ' ' . $message);
foreach (SPAM_KEYWORDS as $keyword) {
    if (str_contains($haystack, $keyword)) {
        respond(400, ['success' => false, 'message' => 'Message appears to be spam']);
    }
}

$ip = single_line($_SERVER['REMOTE_ADDR'] ?? 'unknown') ?: 'unknown';
if (is_rate_limited($ip)) {
    respond(429, [
        'success' => false,
        'message' => 'Too many submissions. Please try again later.',
    ]);
}

$userAgent = single_line($_SERVER['HTTP_USER_AGENT'] ?? '');
$received = date('F j, Y \a\t g:i A');

$body = '<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333">'
    . '<div style="max-width:600px;margin:0 auto;padding:20px">'
    . '<div style="background:#f8f9fa;padding:20px;border-radius:5px;margin-bottom:20px">'
    . '<h2 style="margin:0 0 8px">New enquiry from the ' . e(SITE_NAME) . ' website</h2>'
    . '<p style="margin:0">Received on ' . e($received) . '</p>'
    . '</div>'
    . '<p><strong>Name:</strong><br>' . e($name) . '</p>'
    . '<p><strong>Email:</strong><br><a href="mailto:' . e($email) . '">' . e($email) . '</a></p>'
    . '<p><strong>Subject:</strong><br>' . e($subject) . '</p>'
    . '<p><strong>Message:</strong><br>' . nl2br(e($message)) . '</p>'
    . '<hr style="border:none;border-top:1px solid #eee;margin:24px 0">'
    . '<p style="font-size:12px;color:#666">IP: ' . e($ip) . '<br>User agent: ' . e($userAgent) . '</p>'
    . '</div></body></html>';

$sent = send_html_mail(CONTACT_TO, SUBJECT_PREFIX . ' ' . $subject, $body, $email);

log_submission([
    'name'    => $name,
    'email'   => $email,
    'subject' => $subject,
    'message' => $message,
    'ip'      => $ip,
    'sent'    => $sent,
]);

if (!$sent) {
    error_log('[contact] mail() failed for ' . $email);
    respond(500, [
        'success' => false,
        'message' => 'Failed to send email. Please try again later or contact us directly.',
    ]);
}

if (SEND_AUTO_REPLY) {
    $reply = '<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333">'
        . '<div style="max-width:600px;margin:0 auto;padding:20px">'
        . '<h2>Thank you for contacting ' . e(SITE_NAME) . '</h2>'
        . '<p>Dear ' . e($name) . ',</p>'
        . '<p>We have received your message and will get back to you within 24 hours.</p>'
        . '<p><strong>Subject:</strong> ' . e($subject) . '</p>'
        . '<p><strong>Your message:</strong><br>' . nl2br(e($message)) . '</p>'
        . '<p>For urgent enquiries, call us on +92-300-2252080.</p>'
        . '<p>Best regards,<br>' . e(SITE_NAME) . '</p>'
        . '</div></body></html>';

    // Best effort: the visitor's own confirmation must never fail their submission.
    @send_html_mail($email, 'Thank you for contacting ' . SITE_NAME, $reply);
}

respond(200, [
    'success' => true,
    'message' => 'Thank you for your message! We will get back to you within 24 hours.',
]);
