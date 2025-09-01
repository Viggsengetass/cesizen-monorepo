FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libzip-dev libonig-dev \
    && docker-php-ext-install pdo pdo_pgsql zip opcache

# Configure opcache for performance
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
 && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini \
 && echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini \
 && echo "opcache.max_accelerated_files=10000" >> /usr/local/etc/php/conf.d/opcache.ini

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install PHP dependencies (en production)
RUN composer install --no-dev --optimize-autoloader

# Copy JWT keys (⚠️ assure-toi qu'ils existent bien dans le repo)
COPY config/jwt /app/config/jwt

# Expose le port Symfony
EXPOSE 8000

# Lancer Symfony en prod via le serveur PHP interne
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
