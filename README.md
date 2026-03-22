# ReleasePilot 🚀

ReleasePilot is a lightweight release checklist tool designed to help developers manage and track their release process efficiently.

## ✨ Features

* Create and manage releases
* Track progress using checklist steps
* Automatic release status:

  * Planned
  * Ongoing
  * Done
* Update release notes / additional information

## 🏗️ Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS

**Backend**

* Node.js
* Express

**Database**

* PostgreSQL (hosted online)

**ORM**

* Prisma

---

## 📁 Project Structure

```
release-pilot/
├── client/     # Frontend (React)
├── server/     # Backend (Express + Prisma)
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/release-pilot.git
cd release-pilot
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create a `.env` file:

```
DATABASE_URL="your_postgresql_connection_string"
```

Run:

```
npx prisma migrate dev
node src/index.js
```

---

### 3. Setup Frontend

```
cd client
npm install
npm run dev
```

---

## 🔌 API Endpoints (To be implemented)

* `GET /releases`
* `POST /releases`
* `PATCH /releases/:id`
* `PATCH /releases/:id/steps`

---

## 🗄️ Database Schema (Planned)

* Release

  * id
  * name
  * date
  * status (computed)
  * additionalInfo
  * steps (boolean array / JSON)

---

## 🚀 Deployment

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL

---

## 📌 Notes

* This is a single-user application
* Steps are fixed and shared across all releases
* Status is computed dynamically based on steps

---
