# 🚀 Task Management API (Backend)

A secure and scalable REST API for managing tasks. Built with **Node.js, Express, TypeScript, and Prisma ORM (PostgreSQL)**.

---

## ✨ Features

* 🔐 **Authentication**

  * JWT-based authentication (Access & Refresh tokens)
  * Secure password hashing using bcrypt
  * Refresh tokens stored in database

* 📝 **Task Management**

  * Create, update, delete tasks
  * Pagination support
  * Search (title & description)
  * Filter by completion status

* 🛡️ **Security**

  * Protected routes using middleware
  * Input validation
  * Environment-based secrets

* 🗄️ **Database**

  * PostgreSQL with Prisma ORM
  * Relational schema (User ↔ Tasks)
  * Auto timestamps

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication

---

## 📦 Prerequisites

* Node.js (v18+)
* PostgreSQL database

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Environment Variables

Create a `.env` file:

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

### 4. Run Server

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

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |
| POST   | /auth/refresh  | Refresh token |
| POST   | /auth/logout   | Logout        |

---

### 📝 Task Routes *(Protected)*

> Requires: `Authorization: Bearer <token>`

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| GET    | /tasks            | Get all tasks |
| POST   | /tasks            | Create task   |
| PATCH  | /tasks/:id        | Update task   |
| DELETE | /tasks/:id        | Delete task   |
| PATCH  | /tasks/:id/toggle | Toggle status |

---

## 🔍 Query Parameters

* `page` → Page number
* `limit` → Items per page
* `search` → Search keyword
* `completed` → true / false

---

## 🧪 Testing

Use:

* Postman
* Thunder Client

---
# 🎨 Task Management Frontend (Next.js)

A modern, fast, and responsive frontend built with **Next.js (App Router), TypeScript, and Tailwind CSS**.

---

## ✨ Features

* 🔐 **Authentication UI**

  * Login & Register pages
  * JWT integration
  * Protected routes

* 📝 **Task Management**

  * Create, update, delete tasks
  * Toggle task completion
  * Search & filter
  * Pagination

* 🎨 **Modern UI/UX**

  * Fully responsive design
  * Smooth animations (Framer Motion)
  * Toast notifications
  * Clean UI

---

## 🛠️ Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios
* Lucide React

---

## 📂 Project Structure

```text
frontend/
├── app/
├── components/
├── hooks/
├── lib/
├── types/
└── public/
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

### 3. Run App

```bash
npm run dev
```

👉 http://localhost:3000

---

## 🔗 API Integration

Make sure backend is running:

```bash
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. Login → get access token
2. Store token
3. Send token in API headers
4. Refresh token when expired

---

## 👨‍💻 Author

**Manas Kumar**
🌐 https://www.ermanas.in
