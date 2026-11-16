<?php

function startAppSession()
{
    if (session_status() === PHP_SESSION_NONE) {
        $forwardedProtocol = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';
        $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

        if ($forwardedProtocol !== '') {
            $isHttps = trim(explode(',', $forwardedProtocol)[0]) === 'https';
        }

        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'secure' => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        session_start();
    }
}
