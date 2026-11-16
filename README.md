# Note Manager — PHP Notes Management Application

A Persian RTL note management web application built with **PHP** and **MySQL/MariaDB**. Users can create and manage personal notes, publish notes for other users, and browse notes with search, date filters, sorting, and pagination.

## Live Demo

**[Open the interactive Note Manager preview](https://note-manager-web-production.up.railway.app/demo/)**

The hosted preview is a front-end demo served from the same Railway service. It includes sample content and lets visitors try the note-management interface without installing PHP, Composer, Docker, or a database. Changes made in this preview are stored in the visitor's own browser using local storage; they are not sent to the PHP application or shared with other visitors.

The full PHP + MySQL application runs on the same Railway service and is documented below; it can also be run locally with Docker.

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
- **UI Preview Hosting:** GitHub Pages

## Project Structure

```text
note-manager/
├── .github/workflows/       # GitHub Pages deployment workflow
├── demo/                   # Standalone interactive browser preview
├── Dockerfile
├── docker-entrypoint.sh
├── compose.yml
├── php.ini
└── src/
    ├── app/
    │   ├── config/          # Database and session configuration
    │   ├── controllers/     # Authentication, notes, pages, and profile
    │   ├── database/        # Initial schema and startup setup
    │   ├── helpers/         # Session, validation, URL, and date helpers
    │   ├── libraries/       # Core, controller, and database classes
    │   ├── migrations/      # Remember-token migration
    │   ├── models/          # User and note models
    │   └── views/           # Authentication, notes, profile, and layouts
    ├── public/              # Apache document root
    ├── vendor/              # Composer dependencies
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

### 3. Start the containers

```bash
docker compose up -d --build
```

The application is available at:

```text
http://localhost:8000
```

MariaDB is exposed on port `8100` on the host.

On startup, the PHP container waits for the database, creates the `notes_app` database if it does not exist, and applies the schema in `src/app/database/schema.sql`. No manual table creation is required for a fresh database.

### 4. Install PHP dependencies (only when needed)

Composer dependencies are included under `src/vendor`. To refresh or reinstall them, run:

```bash
cd src
composer install
```

## Deployment Configuration

The Docker image is configured to serve the application from `src/public`, rather than exposing application source files. At startup, `docker-entrypoint.sh` runs the database setup script before starting Apache.

Configure the following environment variables in a hosted environment:

| Variable | Purpose |
| --- | --- |
| `DB_HOST` | Database hostname |
| `DB_PORT` | Database port |
| `DB_USER` | Database username |
| `DB_PASS` | Database password |
| `DB_NAME` | Database name |
| `APP_URL` | Optional public application URL |

The configuration also accepts the standard `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, and `MYSQLDATABASE` variables exposed by some managed MySQL services. Do not use the local Compose password for a public deployment; use the generated credentials from your database provider.

## Notes

- The application uses a custom MVC structure with separate controllers, models, views, libraries, and helpers.
- Database queries are executed through PDO prepared statements.
- Passwords are stored using PHP's password hashing functions.
- Remember-me tokens are stored as hashes and have an expiration time.
- Public notes are visible to other signed-in users; private notes remain available to their owner.
- The application uses a Jalali date picker, while date filter values are submitted in Gregorian format.
- The standalone GitHub Pages preview is a browser-side simulation; it is not connected to the PHP backend or a shared database.
- Do not enter real personal information into the public preview.

## Author

Samira Sadrolashrafi

GitHub: https://github.com/samira-sadrolashrafi
