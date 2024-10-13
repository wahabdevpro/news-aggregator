#!/bin/bash

# Change to the Laravel project directory
cd /var/www/html

# Run Laravel migrations
php artisan migrate --force

# Run any other initialization tasks, if needed

# Start Apache in the foreground
apachectl -D FOREGROUND
