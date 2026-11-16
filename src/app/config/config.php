<?php

define('DB_HOST', getenv('DB_HOST') ?: 'php81_dev_environment_database');
define('DB_PORT', (int) (getenv('DB_PORT') ?: 3306));
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '1234');
define('DB_NAME', getenv('DB_NAME') ?: 'notes_app');
