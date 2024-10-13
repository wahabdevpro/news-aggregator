<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */


    'newsapi' => [
        'url' => env('NEWSAPI_URL', 'https://newsapi.org/v2'),
        'key' => env('NEWSAPI_KEY', null),
    ],

    'nytimes' => [
        'url' => env('NYTIMES_URL', 'https://api.nytimes.com'),
        'key' => env('NYTIMES_KEY', null),
    ],

    'guardianapis' => [
        'url' => env('GUARDIANAPIS_URL', 'https://content.guardianapis.com'),
        'key' => env('GUARDIANAPIS_KEY', null),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
