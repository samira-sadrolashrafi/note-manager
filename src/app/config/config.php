<?php

define('DB_HOST', getenv('DB_HOST') ?: (getenv('MYSQLHOST') ?: 'php81_dev_environment_database'));
define('DB_PORT', (int) (getenv('DB_PORT') ?: (getenv('MYSQLPORT') ?: 3306)));
define('DB_USER', getenv('DB_USER') ?: (getenv('MYSQLUSER') ?: 'root'));
define('DB_PASS', getenv('DB_PASS') ?: (getenv('MYSQLPASSWORD') ?: '1234'));
define('DB_NAME', getenv('DB_NAME') ?: (getenv('MYSQLDATABASE') ?: 'notes_app'));
