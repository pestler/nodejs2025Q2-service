```markdown
# 🏠 Home Library

📚 A powerful Node.js service for efficiently managing a personal music library, featuring authentication, CRUD operations, and seamless API documentation with Swagger.

---

## 🔹 Project Overview

**Home Library** is a **NestJS-based application** built to efficiently manage users, tracks, artists, albums, and favorites. It features secure authentication, full CRUD operations, and integrated Swagger documentation to facilitate smooth API interaction. Designed with scalability in mind, this service ensures a seamless experience for organizing and retrieving music collections while maintaining robust security and structured data management.

---

## ✅ Prerequisites

Before installation, ensure you have:

- **Node.js** >= 22.14.0
- **npm** (or **yarn** as an alternative package manager)
- **NestJS CLI** (optional, for development)

---

## 🚀 Setup and Installation

### 🔹 Clone the repository

```bash
git clone https://github.com/pestler/nodejs2025Q2-service.git
cd nodejs2025Q2-service
```

## Switch to the appropriate branch:

To access the database functionality, switch to the feat-add-database branch:

```
git checkout develop-part3
```

### 🔹 Install dependencies

```bash
npm install or npm install -force
```

### 🔹 Configure environment variables

Create a `.env` file in the project root directory and add:

```env
PORT=4000

POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=strong_password_123
POSTGRES_DB=home_library_db_2025
POSTGRES_HOST=postgres

CRYPT_SALT=12
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

```

---

## 🏃 Run the application

### 🔹 Development mode

```bash
npm run start:dev
```

### 🔹 Production mode

```bash
npm run docker:start
```

---


## 📌 API Documentation

The project includes Swagger for API documentation. Once the application is running, visit:

[http://localhost:4000/doc](http://localhost:4000/doc)

Here, you will find detailed API documentation with interactive testing.

---

## 🔹 Useful Scripts
- `npm run docker:start` - Runs the application in development (watch) mode.
- `npm run docker:stop` - Stops and removes the Docker containers and network created by docker compose up.
- `npm run docker:scout` - Analyzes the specified Docker image for known vulnerabilities using Docker Scout.
- `npm run test` - Executes unit tests using Jest.

### 🔹 Build and Formatting

- **Build the project**
  ```bash
  npm run build
  ```

- **Format code using Prettier**
  ```bash
  npm run format
  ```

- **Lint (check for errors)**
  ```bash
  npm run lint
  ```

### 🔹 Testing

- **Run unit tests**
  ```bash
  npm run test
  ```

- **Run tests with coverage reports**
  ```bash
  npm run test:cov
  ```

- **Run tests in watch mode**
  ```bash
  npm run test:watch
  ```

- **Debug tests**
  ```bash
  npm run test:debug
  ```

### 🔹 Debugging and Development

- **Run development mode**
  ```bash
  npm run start:dev
  ```

- **Run with debugging**
  ```bash
  npm run start:debug
  ```

- **Run in production**
  ```bash
  npm run start:prod
  ```

---

## 🛠 Technologies Used

- **NestJS** — A modular framework for building scalable applications
- **Swagger** — Integrated API documentation
- **Jest** — Used for unit and integration testing
- **ESLint & Prettier** — Ensures code quality and formatting
- **Docker** - Used for containerizing the application, simplifying deployment and ensuring consistent environments.
---

## 📜 License

This project is **UNLICENSED** and strictly intended for personal or non-commercial use. Any commercial utilization requires explicit permission from the author.
