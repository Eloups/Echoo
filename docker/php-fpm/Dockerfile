# PHP 8.3 FPM sur Alpine
FROM php:8.4-fpm-alpine

# Installation des dépendances système
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    icu-dev \
    libzip-dev \
    libxml2-dev \
    oniguruma-dev \
    postgresql-dev \
    zlib-dev \
    curl \
    autoconf \
    make \
    g++ \
    # Installation des extensions PHP requises
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    intl \
    zip \
    opcache \
    mbstring \
    xml \
    # Nettoyage
    && rm -rf /var/cache/apk/*

# Installation de Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY ./apps/api /var/www/api

# Set working dir
WORKDIR /var/www/api

RUN composer install --optimize-autoloader

# Lancement du serveur PHP FPM
CMD ["php-fpm"]