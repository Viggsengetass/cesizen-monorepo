FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Install Symfony CLI (utile mais non utilisé dans CMD)
RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Expose le port
EXPOSE 8000

# Lance le serveur PHP intégré
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
