<?php
/**
 * Professional Portfolio Contact Form Handler
 * 
 * Processes form submissions, validates input, prevents spam,
 * and sends email notifications.
 */

// Configuration
$config = [
    'admin_email' => 'your-email@example.com', // Your email address
    'site_name' => 'Peter\'s Portfolio',
    'form_name' => 'Portfolio Contact Form',
    'subject_prefix' => '[Portfolio Contact]',
    'honeypot_field' => 'website', // Honeypot field name (hidden field)
    'required_fields' => ['name', 'email', 'subject', 'message'],
    'max_lengths' => [
        'name' => 100,
        'email' => 100,
        'subject' => 200,
        'message' => 5000
    ],
    'success_redirect' => 'thank-you.html', // Page to redirect to after successful submission
    'error_redirect' => 'error.html', // Page to redirect to if there's an error
    'log_submissions' => true, // Whether to log form submissions
    'log_file' => 'submissions.log', // Log file name (must be writable)
    'enable_akismet' => false, // Set to true if you have Akismet API key
    'akismet_api_key' => '', // Your Akismet API key
];

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method.';
    outputResponse($response);
    exit;
}

// Check for CSRF token
if (!isset($_POST['csrf_token']) || !validateCsrfToken($_POST['csrf_token'])) {
    $response['message'] = 'Security validation failed.';
    outputResponse($response);
    exit;
}

// Check honeypot (anti-spam)
if (isset($_POST[$config['honeypot_field']]) && !empty($_POST[$config['honeypot_field']])) {
    // This is likely a bot - pretend it worked
    $response['success'] = true;
    $response['message'] = 'Thank you for your message!';
    
    // Log the spam attempt if enabled
    if ($config['log_submissions']) {
        logSubmission('SPAM', $_POST, 'Honeypot field not empty');
    }
    
    outputResponse($response);
    exit;
}

// Validate required fields
foreach ($config['required_fields'] as $field) {
    if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
        $response['errors'][] = $field;
    }
}

if (!empty($response['errors'])) {
    $response['message'] = 'Please fill in all required fields.';
    outputResponse($response);
    exit;
}

// Sanitize and validate input
$name = sanitizeInput($_POST['name']);
$email = sanitizeInput($_POST['email']);
$subject = sanitizeInput($_POST['subject']);
$message = sanitizeInput($_POST['message']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['errors'][] = 'email';
    $response['message'] = 'Please enter a valid email address.';
    outputResponse($response);
    exit;
}

// Check max lengths
foreach ($config['max_lengths'] as $field => $maxLength) {
    if (isset($_POST[$field]) && strlen($_POST[$field]) > $maxLength) {
        $response['errors'][] = $field;
    }
}

if (!empty($response['errors'])) {
    $response['message'] = 'Some fields exceed maximum allowed length.';
    outputResponse($response);
    exit;
}

// Check for spam with Akismet if enabled
if ($config['enable_akismet'] && !empty($config['akismet_api_key'])) {
    if (checkAkismet($name, $email, $message, $config['akismet_api_key'])) {
        // Log spam if enabled
        if ($config['log_submissions']) {
            logSubmission('SPAM', $_POST, 'Flagged by Akismet');
        }
        
        // Pretend it worked to not alert spammer
        $response['success'] = true;
        $response['message'] = 'Thank you for your message!';
        outputResponse($response);
        exit;
    }
}

// All validations passed, proceed with sending email
$mailSent = sendEmail($name, $email, $subject, $message, $config);

if ($mailSent) {
    $response['success'] = true;
    $response['message'] = 'Thank you for your message! I will get back to you soon.';
    
    // Log successful submission if enabled
    if ($config['log_submissions']) {
        logSubmission('SUCCESS', $_POST);
    }
    
    if (!empty($config['success_redirect'])) {
        header('Location: ' . $config['success_redirect']);
        exit;
    }
} else {
    $response['message'] = 'Sorry, there was a problem sending your message. Please try again later.';
    
    // Log error if enabled
    if ($config['log_submissions']) {
        logSubmission('ERROR', $_POST, 'Mail sending failed');
    }
    
    if (!empty($config['error_redirect'])) {
        header('Location: ' . $config['error_redirect']);
        exit;
    }
}

outputResponse($response);
exit;

/**
 * Sanitize user input
 */
function sanitizeInput($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Send email with form data
 */
function sendEmail($name, $email, $subject, $message, $config) {
    // Email headers
    $headers = "From: {$config['site_name']} <{$config['admin_email']}>" . "\r\n";
    $headers .= "Reply-To: {$name} <{$email}>" . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email subject
    $emailSubject = $config['subject_prefix'] . ' ' . $subject;
    
    // Build email message body
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            .message-container { background: #f5f7ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>{$config['form_name']} Submission</h1>
            <p><strong>From:</strong> {$name} ({$email})</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong></p>
            <div class='message-container'>
                " . nl2br($message) . "
            </div>
            <div class='footer'>
                <p>This message was sent from {$config['site_name']} contact form at " . date('Y-m-d H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email
    return mail($config['admin_email'], $emailSubject, $emailBody, $headers);
}

/**
 * Log form submissions
 */
function logSubmission($status, $data, $reason = '') {
    global $config;
    
    if (!$config['log_submissions']) return false;
    
    $logFile = $config['log_file'];
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
    
    // Create simple log entry
    $logEntry = "[{$timestamp}] STATUS: {$status}, IP: {$ip}, NAME: {$data['name']}, EMAIL: {$data['email']}, SUBJECT: {$data['subject']}";
    
    if (!empty($reason)) {
        $logEntry .= ", REASON: {$reason}";
    }
    
    $logEntry .= ", USER-AGENT: {$userAgent}\n";
    
    // Write to log file
    return file_put_contents($logFile, $logEntry, FILE_APPEND);
}

/**
 * Validate CSRF token
 */
function validateCsrfToken($token) {
    session_start();
    return isset($_SESSION['csrf_token']) && $_SESSION['csrf_token'] === $token;
}

/**
 * Check Akismet API for spam
 */
function checkAkismet($name, $email, $comment, $akismetKey) {
    $host = 'rest.akismet.com';
    $path = "/1.1/comment-check";
    
    $content = http_build_query([
        'api_key' => $akismetKey,
        'blog' => 'https://' . $_SERVER['HTTP_HOST'],
        'user_ip' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'comment_type' => 'contact-form',
        'comment_author' => $name,
        'comment_author_email' => $email,
        'comment_content' => $comment
    ]);
    
    $request = [
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
                        "Content-Length: " . strlen($content) . "\r\n",
            'content' => $content
        ]
    ];
    
    $context = stream_context_create($request);
    $response = file_get_contents('https://' . $host . $path, false, $context);
    
    return $response === 'true'; // 'true' means it's spam
}

/**
 * Output JSON response and exit
 */
function outputResponse($response) {
    header('Content-Type: application/json');
    echo json_encode($response);
} 