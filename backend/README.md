# 🚀 Task Management System API

A clean, minimal, and secure REST API for managing tasks. Built with **Node.js, Express, TypeScript, and Prisma ORM (PostgreSQL)**.

---

## ✨ Features

* **Authentication**

  * JWT-based authentication (Access & Refresh tokens)
  * Secure password hashing using bcrypt
  * Refresh tokens stored in database for session validation

* **Task Management**

  * Full CRUD operations
  * Pagination support
  * Search (title & description)
  * Filter by completion status

* **Security**

  * Protected routes using middleware
  * Input validation (email format, password rules)
  * Environment-based secrets

* **Database**

  * PostgreSQL with Prisma ORM
  * Relational schema (User ↔ Tasks)
  * Auto timestamps & cascading deletes

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT (Authentication & Authorization)

---

## 📦 Prerequisites

* Node.js (v18+)
* PostgreSQL database

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
npm install
```

### 2. Environment Variables

Rename `.env.example` to `.env` and configure:

```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=3000
```

---

### 3. Database Setup

```bash
npx prisma db push
npx prisma generate
```

---

### 4. Run the Project

**Development**

```bash
npm run dev
```

**Production**

```bash
npm run build
npm start
```

---

## 📡 API Documentation

### 🔐 Auth Routes

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | /auth/register | Register new user    |
| POST   | /auth/login    | Login and get tokens |
| POST   | /auth/refresh  | Refresh access token |
| POST   | /auth/logout   | Logout user          |

---

### 📝 Task Routes *(Protected)*

> Requires: `Authorization: Bearer <accessToken>`

| Method | Endpoint          | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| GET    | /tasks            | Get all tasks (pagination, search, filter) |
| POST   | /tasks            | Create new task                            |
| PATCH  | /tasks/:id        | Update task                                |
| DELETE | /tasks/:id        | Delete task                                |
| PATCH  | /tasks/:id/toggle | Toggle task status                         |

---

## 🔍 Query Parameters (GET /tasks)

* `page` → Page number (default: 1)
* `limit` → Items per page (default: 10)
* `search` → Search keyword
* `completed` → true / false

---

### 📥 Example Request

POST /auth/login

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

## 📤 Example Response

```json
{
  "message": "Login successful",
  "data": {
    "accessToken": "your_access_token",
    "refreshToken": "your_refresh_token"
  }
}
```

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 📁 Project Structure

```
src/
├── auth/
├── tasks/
├── middleware/
├── prisma/
├── types/
├── app.ts
├── server.ts
```

---

## 👨‍💻 Author

**Manas Kumar**  
🌐 https://www.ermanas.in

---
