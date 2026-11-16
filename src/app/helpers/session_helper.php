<?php

function isLoggedIn()
{
    if (
        session_status() === PHP_SESSION_NONE &&
        isset($_COOKIE[session_name()])
    ) {
        startAppSession();
    }

    if (
        session_status() === PHP_SESSION_ACTIVE &&
        isset($_SESSION['user_id'])
    ) {
        return true;
    }

    $token = $_COOKIE['remember_token'] ?? '';
    if (!is_string($token) || !preg_match('/\A[a-f0-9]{64}\z/i', $token)) {
        return false;
    }

    $user = (new User())->findUserByRememberToken(hash('sha256', $token));
    if (!$user) {
        clearRememberCookie();
        return false;
    }

    startAppSession();
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user->id;
    $_SESSION['user_name'] = $user->username;
    $_SESSION['user_email'] = $user->email;

    return true;
}

function rememberCookieOptions(int $expires): array
{
    $forwardedProtocol = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';
    $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

    if ($forwardedProtocol !== '') {
        $isHttps = trim(explode(',', $forwardedProtocol)[0]) === 'https';
    }

    return [
        'expires' => $expires,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax'
    ];
}

function clearRememberCookie()
{
    setcookie('remember_token', '', rememberCookieOptions(time() - 3600));
    unset($_COOKIE['remember_token']);
}
