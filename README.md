# Note Manager — PHP Notes Management Application

A Persian RTL note management web application built with **PHP** and **MySQL/MariaDB**. Users can create and manage personal notes, publish notes for other users, and browse notes with search, date filters, sorting, and pagination.

## About the Project

Note Manager is a server-rendered web application built with a lightweight custom MVC structure. It provides account registration and authentication, profile management, and a notes workspace where users can create, edit, delete, and manage the visibility of their notes.

The interface is designed for Persian-language use and includes Jalali date selection and display.

## Features

### User Accounts

- User registration with username, email, and password
- Login and logout
- Password hashing and verification
- Remember-me functionality with expiring tokens
- Profile editing, including username and email
- Optional password change from the profile page
- Session-based authentication

### Note Management

- Create, edit, and delete notes
- Set notes as private or public
- View personal notes and publicly shared notes
- Browse all notes available to the signed-in user
- Display note authors
- Form validation with feedback messages
- Create and edit notes through AJAX requests

### Search & Organization

- Search notes by title and content
- Filter notes by creation date
- Sort notes by oldest or newest update
- Browse notes using pagination
- Separate views for all notes, personal notes, and public notes
- Jalali date picker with Gregorian date values stored by the application
- Display dates in the Persian calendar

## Tech Stack

- **Backend:** PHP 8.1
- **Database:** MySQL / MariaDB
- **Database Access:** PDO
- **Frontend:** HTML5, CSS3, JavaScript
- **CSS Framework:** Bootstrap 5.3 RTL
- **JavaScript Libraries:** jQuery, Bootstrap JavaScript
- **Date Handling:** Carbon, Jalali Moment, Persian Date, Persian Datepicker
- **Environment:** Docker, Docker Compose
- **Dependency Management:** Composer

## Project Structure

```text
note-manager/
├── Dockerfile
├── compose.yml
├── php.ini
└── src/
    ├── app/
    │   ├── config/          # Database and session configuration
    │   ├── controllers/     # Authentication, notes, pages, and profile
    │   ├── database/
    │   │   └── seeders/     # Sample note data
    │   ├── helpers/         # Session, validation, URL, and date helpers
    │   ├── libraries/       # Core, controller, and database classes
    │   ├── migrations/      # Remember-token table migration
    │   ├── models/          # User and note models
    │   └── views/           # Authentication, notes, profile, and layouts
    ├── public/
    │   ├── css/
    │   ├── js/
    │   ├── vendor/          # Local date-related libraries
    │   └── index.php        # Application entry point
    ├── composer.json
    └── bootstrap.php
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/samira-sadrolashrafi/note-manager.git
cd note-manager
```

### 2. Create the Docker network

The Compose configuration uses an external Docker network:

```bash
docker network create php81_dev_environment_network
```

If the network already exists, this step can be skipped.

### 3. Configure the database

Check the database settings in `src/app/config/config.php` and make sure they match the MariaDB service settings in `compose.yml`.

In the current configuration, the database name in `config.php` differs from the `MYSQL_DATABASE` value in `compose.yml`. Set them to the same database name before starting the application.

The application also requires the `users` and `notes` tables. Their initial schema is not currently included in the repository, so these tables must be created or imported before using the application. The SQL migration in `src/app/migrations/001_remember_tokens.sql` creates the table used for remember-me tokens.

### 4. Start the containers

```bash
docker compose up -d --build
```

The application is available at:

```text
http://localhost:8000
```

MariaDB is exposed on port `8100` on the host.

### 5. Install PHP dependencies

If Composer dependencies need to be installed or refreshed, run Composer from the `src` directory:

```bash
cd src
composer install
```

## Notes

- The application uses a custom MVC structure with separate controllers, models, views, libraries, and helpers.
- Database queries are executed through PDO prepared statements.
- Passwords are stored using PHP's password hashing functions.
- Remember-me tokens are stored as hashes and have an expiration time.
- Public notes are visible to other signed-in users; private notes remain available to their owner.
- The application uses a Jalali date picker, while date filter values are submitted in Gregorian format.
- The initial database schema for the `users` and `notes` tables is not included in the repository yet.

## Author

Samira Sadrolashrafi

GitHub: https://github.com/samira-sadrolashrafi
