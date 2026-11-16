FROM php:8.1-apache-bookworm

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" gd mysqli pdo_mysql zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

ENV APACHE_DOCUMENT_ROOT=/var/www/html

RUN sed -ri "s!/var/www/html!$APACHE_DOCUMENT_ROOT!g" \
        /etc/apache2/sites-available/*.conf \
        /etc/apache2/apache2.conf \
    && sed -ri "s/AllowOverride None/AllowOverride All/g" /etc/apache2/apache2.conf

WORKDIR /var/www/html

COPY --chown=www-data:www-data src/ /var/www/html/
COPY --chown=www-data:www-data demo/ /var/www/html/demo/
COPY php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
