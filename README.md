# 🚀 Task Management System (Full Stack)

A modern, scalable, and secure **Full Stack Task Management System** built using **Next.js, Node.js, Express, TypeScript, and Prisma (PostgreSQL)**.

---

## 🌐 Live Demo

* 🎨 Frontend: Coming Soon
* ⚙️ Backend API: Coming Soon

---

## 📦 Project Overview

This project is a complete full-stack application consisting of:

* **Frontend** → Built with Next.js (App Router) for a fast and responsive UI
* **Backend** → REST API built with Node.js, Express, and TypeScript
* **Database** → PostgreSQL with Prisma ORM
* **Authentication** → JWT-based (Access + Refresh tokens)

---

## ✨ Key Features

### 🔐 Authentication & Security

* JWT-based authentication (Access & Refresh tokens)
* Password hashing with bcrypt
* Refresh token stored in database
* Protected API routes using middleware

---

### 📝 Task Management

* Create, update, delete tasks
* Toggle task completion
* Pagination support
* Search & filtering

---

### 🎨 Modern UI/UX

* Fully responsive design
* Smooth animations (Framer Motion)
* Clean and minimal interface
* Toast notifications

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication

---

## 📁 Project Structure

```text
task-management-system/
├── backend/      # Node.js Express API
├── frontend/     # Next.js Application
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/manaskumar9926/Task-Management-System-Full-Stack.git
cd Task-Management-System-Full-Stack
```

---

### 2. Backend Setup

```bash
cd backend
npm install

# Configure environment variables (.env)
npx prisma db push
npx prisma generate

npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Configure .env.local
npm run dev
```

---

## 🔗 API & Frontend Connection

Frontend connects to backend via:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User logs in → receives access & refresh token
2. Access token used for API requests
3. Refresh token used to generate new access token
4. Logout clears session from database

---

## 🚀 Deployment

* Frontend → Vercel
* Backend → Render / Railway

---

## 🧪 Testing

* Postman
* Thunder Client

---

## 👨‍💻 Author

**Manas Kumar**
🌐 https://www.ermanas.in

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---
