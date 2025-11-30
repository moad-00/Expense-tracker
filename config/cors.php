<?php


return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    /*
     * IMPORTANT: This is the URL where your friend's frontend is running.
     * If their URL is different, change it here.
     */
    'allowed_origins' => ['http://localhost:5174', 'http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true
];
