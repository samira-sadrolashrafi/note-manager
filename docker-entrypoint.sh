#!/bin/sh
set -eu

echo "Checking database schema..."
php /var/www/html/app/database/setup.php

exec "$@"
