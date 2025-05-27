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

### 🔹 Install dependencies

```bash
npm install or npm install -force
```

### 🔹 Configure environment variables

Create a `.env` file in the project root directory and add:

```env
PORT=4000

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h

```

---

## 🏃 Run the application

### 🔹 Development mode

```bash
npm run start:dev
```

### 🔹 Production mode

```bash
npm run build
npm run start:prod
```

---

## 📌 API Documentation

The project includes Swagger for API documentation. Once the application is running, visit:

[http://localhost:4000/doc](http://localhost:4000/doc)

Here, you will find detailed API documentation with interactive testing.

---

## 🔹 Useful Scripts

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

- **Generate Swagger documentation**
  ```bash
  npm run swagger:convert
  ```

---

## 🛠 Technologies Used

- **NestJS** — A modular framework for building scalable applications
- **Swagger** — Integrated API documentation
- **MongoDB** — A database for storing users and collections
- **Jest** — Used for unit and integration testing
- **ESLint & Prettier** — Ensures code quality and formatting

---

## 📜 License

This project is **UNLICENSED** and strictly intended for personal or non-commercial use. Any commercial utilization requires explicit permission from the author.
