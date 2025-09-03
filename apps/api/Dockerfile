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

# ---- Xdebug pour la couverture (désactivé par défaut) ----
RUN pecl channel-update pecl.php.net \
 && pecl install xdebug \
 && docker-php-ext-enable xdebug \
 && { \
      echo "xdebug.mode=coverage"; \
      echo "xdebug.start_with_request=off"; \
    } > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# ---- Opcache (perf) ----
RUN { \
      echo "opcache.enable=1"; \
      echo "opcache.validate_timestamps=0"; \
      echo "opcache.memory_consumption=128"; \
      echo "opcache.max_accelerated_files=20000"; \
    } > /usr/local/etc/php/conf.d/opcache.ini

# ---- Composer ----
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Symfony CLI (utile en dev) ----
RUN curl -sS https://get.symfony.com/cli/installer | bash \
 && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# ---- Réglages PHP généraux ----
RUN { \
      echo "date.timezone=${TZ}"; \
      echo "memory_limit=${PHP_MEMORY_LIMIT}"; \
      echo "variables_order=EGPCS"; \
    } > /usr/local/etc/php/conf.d/app.ini

# ---- Crée les clés JWT automatiquement ----
RUN mkdir -p config/jwt && \
    openssl genrsa -out config/jwt/private.pem -aes256 -passout pass:$JWT_PASSPHRASE 4096 && \
    openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem -passin pass:$JWT_PASSPHRASE

# ---- Copier le code Symfony (si besoin, Railway le fait déjà avec apps/api comme root) ----
# COPY . .

# ---- Dossier de travail ----
WORKDIR /app

# ---- Port exposé ----
EXPOSE 8000

# ---- Commande par défaut la----
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
