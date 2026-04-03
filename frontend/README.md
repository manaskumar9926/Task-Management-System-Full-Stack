# 🎨 Task Management Frontend (Next.js)

A modern, high-performance frontend for the Task Management System. Built with **Next.js (App Router), TypeScript, and Tailwind CSS**, focusing on speed, responsiveness, and a premium user experience.

---

## 🚀 Features

* 🔐 **Authentication UI**

  * Login & Register pages
  * JWT-based authentication integration
  * Protected routes handling

* 📝 **Task Management**

  * Create, update, delete tasks
  * Toggle task completion
  * Search and filter tasks
  * Pagination support

* 🎨 **Modern UI/UX**

  * Fully responsive design (mobile + desktop)
  * Smooth animations with Framer Motion
  * Toast notifications (Sonner)
  * Clean and minimal interface

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Axios**
* **Lucide React**

---

## 📂 Project Structure

```text
frontend/
├── app/                # Pages & layouts (App Router)
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # API & utility functions
├── types/              # TypeScript types
└── public/             # Static assets
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

### 3. Run Development Server

```bash
npm run dev
```

👉 App will run on:
http://localhost:3000

---

## 🔗 API Integration

This frontend connects to the backend API.

Make sure backend is running on:

```bash
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User logs in → receives access token
2. Token stored (localStorage / cookies)
3. Token sent in headers for protected APIs
4. If expired → refresh token used

---

## 👨‍💻 Author

**Manas Kumar**
🌐 https://www.ermanas.in

---
