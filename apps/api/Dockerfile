# ---- Base PHP CLI 8.4 ----
FROM php:8.4-cli

ENV APP_ENV=prod \
    COMPOSER_ALLOW_SUPERUSER=1 \
    PHP_MEMORY_LIMIT=512M \
    TZ=Europe/Paris \
    JWT_PASSPHRASE=MySuperJwtPass2025!

# ---- OS deps (avec outils de build pour PECL) ----
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip zip curl ca-certificates tzdata \
    libpq-dev libzip-dev libicu-dev openssl \
    autoconf build-essential pkg-config \
 && rm -rf /var/lib/apt/lists/*

# ---- PHP extensions ----
RUN docker-php-ext-configure intl \
 && docker-php-ext-install -j"$(nproc)" pdo pdo_pgsql zip intl opcache

# ---- Xdebug (optionnel) ----
RUN pecl channel-update pecl.php.net \
 && pecl install xdebug \
 && docker-php-ext-enable xdebug \
 && echo "xdebug.mode=coverage\nxdebug.start_with_request=off" > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# ---- Opcache ----
RUN echo "opcache.enable=1\nopcache.validate_timestamps=0\nopcache.memory_consumption=128\nopcache.max_accelerated_files=20000" > /usr/local/etc/php/conf.d/opcache.ini

# ---- Composer ----
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Symfony CLI ----
RUN curl -sS https://get.symfony.com/cli/installer | bash \
 && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# ---- Réglages PHP ----
RUN echo "date.timezone=${TZ}\nmemory_limit=${PHP_MEMORY_LIMIT}\nvariables_order=EGPCS" > /usr/local/etc/php/conf.d/app.ini

# ---- JWT keys ----
RUN mkdir -p apps/api/config/jwt && \
    openssl genrsa -out apps/api/config/jwt/private.pem -aes256 -passout pass:$JWT_PASSPHRASE 4096 && \
    openssl rsa -pubout -in apps/api/config/jwt/private.pem -out apps/api/config/jwt/public.pem -passin pass:$JWT_PASSPHRASE

# ---- Dossier de travail ----
WORKDIR /app/apps/api

# ---- Port exposé ----
EXPOSE 8000

# ---- Commande par défaut ----
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
