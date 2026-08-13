<?php
// Contact Form Handler for NR Associates Landing Page
// This script handles contact form submissions with security and validation

// Set content type to JSON for API responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

print_r($_POST);
exit;
// Configuration - UPDATE THESE VALUES
$recipient_email = 'admin@nr-associates.com'; // Change this to your email
$from_email = 'admin@nr-associates.com'; // Change this to your domain email
$site_name = 'NR Associates | Query';
$subject_prefix = '[Contact Form]';

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to send email
function send_email($to, $subject, $message, $from, $reply_to = null) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $from" . "\r\n";
    if ($reply_to) {
        $headers .= "Reply-To: $reply_to" . "\r\n";
    }
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    return mail($to, $subject, $message, $headers);
}

// Function to log submissions (optional)
function log_submission($data) {
    $log_file = 'contact_submissions.log';
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = "[$timestamp] " . json_encode($data) . "\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

try {
    // Get and validate form data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    } elseif (strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters long';
    }
    
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!validate_email($email)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    if (empty($subject)) {
        $errors[] = 'Subject is required';
    } elseif (strlen($subject) < 5) {
        $errors[] = 'Subject must be at least 5 characters long';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    } elseif (strlen($message) < 10) {
        $errors[] = 'Message must be at least 10 characters long';
    }
    
    // Check for potential spam (basic checks)
    $spam_keywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money'];
    $full_text = strtolower($name . ' ' . $email . ' ' . $subject . ' ' . $message);
    
    foreach ($spam_keywords as $keyword) {
        if (strpos($full_text, $keyword) !== false) {
            $errors[] = 'Message appears to be spam';
            break;
        }
    }
    
    // Rate limiting (basic implementation)
    $ip = $_SERVER['REMOTE_ADDR'];
    $rate_limit_file = 'rate_limit.json';
    $current_time = time();
    $rate_limit_window = 300; // 5 minutes
    $max_submissions = 3; // Max 3 submissions per 5 minutes
    
    if (file_exists($rate_limit_file)) {
        $rate_data = json_decode(file_get_contents($rate_limit_file), true);
        
        // Clean old entries
        $rate_data = array_filter($rate_data, function($timestamp) use ($current_time, $rate_limit_window) {
            return ($current_time - $timestamp) < $rate_limit_window;
        });
        
        // Check if IP has exceeded limit
        $ip_submissions = array_filter($rate_data, function($timestamp, $stored_ip) use ($ip) {
            return $stored_ip === $ip;
        }, ARRAY_FILTER_USE_BOTH);
        
        if (count($ip_submissions) >= $max_submissions) {
            $errors[] = 'Too many submissions. Please try again later.';
        }
    }
    
    // If there are validation errors, return them
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Update rate limiting
    if (!isset($rate_data)) {
        $rate_data = [];
    }
    $rate_data[] = $current_time;
    $rate_data[] = $ip;
    file_put_contents($rate_limit_file, json_encode($rate_data));
    
    // Prepare email content
    $email_subject = $subject_prefix . ' ' . $subject;
    
    $email_body = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-radius: 3px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission from $site_name</h2>
                <p>Received on " . date('F j, Y \a\t g:i A') . "</p>
            </div>
            
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>$subject</div>
            </div>
            
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
            
            <div class='footer'>
                <p>This message was sent from the contact form on $site_name website.</p>
                <p>IP Address: $ip | User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Send email
    $email_sent = send_email($recipient_email, $email_subject, $email_body, $from_email, $email);
    
    if ($email_sent) {
        // Log successful submission
        log_submission([
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'ip' => $ip,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
        // Send auto-reply to user
        $auto_reply_subject = "Thank you for contacting $site_name";
        $auto_reply_body = "
        <html>
        <head>
            <title>Thank you for your message</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Thank You for Contacting $site_name!</h2>
                </div>
                <p>Dear $name,</p>
                <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
                <p><strong>Your Message:</strong></p>
                <p>Subject: $subject</p>
                <p>Message: " . nl2br($message) . "</p>
                <p>If you have any urgent inquiries, please call us at +92-300-2252080.</p>
                <p>Best regards,<br>$site_name Team</p>
            </div>
        </body>
        </html>";
        
        send_email($email, $auto_reply_subject, $auto_reply_body, $from_email);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    } else {
        // Email sending failed
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email. Please try again later or contact us directly.'
        ]);
    }
    
} catch (Exception $e) {
    // Log error
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred. Please try again later.'
    ]);
}
?>
