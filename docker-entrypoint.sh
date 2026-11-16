#!/bin/sh
set -eu

# PHP's Apache image must run with exactly one MPM.
rm -f /etc/apache2/mods-enabled/mpm_event.load \
      /etc/apache2/mods-enabled/mpm_event.conf \
      /etc/apache2/mods-enabled/mpm_worker.load \
      /etc/apache2/mods-enabled/mpm_worker.conf

a2enmod mpm_prefork rewrite

echo "Enabled Apache MPM configuration:"
ls -l /etc/apache2/mods-enabled/mpm_*.load

apache2ctl configtest

echo "Checking database schema..."
php /var/www/html/app/database/setup.php

exec "$@"
