# Use the official Ubuntu image as a base
FROM ubuntu:20.04

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Apache, PHP 8.2, and other necessary packages for Laravel
RUN apt-get update && apt-get install -y \
    apache2 \
    software-properties-common \
    && add-apt-repository ppa:ondrej/php \
    && apt-get update && apt-get install -y \
    libapache2-mod-php8.2 \
    php8.2 \
    php8.2-cli \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-zip \
    php8.2-sqlite3 \
    php8.2-curl \
    curl \
    git \
    unzip \
    tzdata

# Install Node.js (Version 20)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Set the working directory for the backend (Laravel API)
WORKDIR /var/www/html

# Copy the Laravel backend files to the container
COPY backend/ /var/www/html

# Copy the .env-backend file and rename it to .env in the backend folder
COPY ./docker/.env-backend /var/www/html/.env

# Install Composer for Laravel dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --optimize-autoloader --no-dev

# Set proper permissions for Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Copy Apache config file to enable .htaccess overrides
COPY ./docker/apache/laravel.conf /etc/apache2/sites-available/000-default.conf

# Copy the entrypoint script
COPY ./docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the working directory for the frontend (React/Vite app)
WORKDIR /frontend

# Copy the frontend files
COPY frontend/ /frontend

# Copy the .env-frontend file and rename it to .env in the frontend folder
COPY ./docker/.env-frontend /frontend/.env

# Install frontend dependencies and build the React app
RUN npm install
RUN npm run build

# Copy the built React app into Laravel's public directory
RUN cp -r /frontend/dist/* /var/www/html/public/

# Expose port 80 for Apache
EXPOSE 80

# Use the entrypoint script to start the container
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]