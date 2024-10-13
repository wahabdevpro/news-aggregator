<?php

// Include route files, we can include here or if our application is quite large we can include in bootstrap/app.php.
// To increase the performance we can use the php artisan route:cache command to cache the routes.
require __DIR__ . '/api/Auth/auth.php';
require __DIR__ . '/api/User/user_preferences.php';
require __DIR__ . '/api/News/news.php';