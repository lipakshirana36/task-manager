# TaskFlow — MERN Task Manager

A full-stack task management app built with MongoDB, Express, React and Node.js (MERN), using Redux Toolkit for state management and Tailwind CSS for styling.

## Features

- JWT-based authentication (register/login) with hashed passwords (bcrypt)
- Create, edit (inline), and delete tasks (full CRUD)
- Task priority (low/medium/high) and optional due date
- Status workflow: To Do → In Progress → Done (click the status dot to cycle)
- Filter tasks by status
- Each user only sees their own tasks (protected by JWT on every request)
- Redux Toolkit for global auth and task state
- Clean, responsive UI built with Tailwind CSS

## Tech Stack

**Frontend:** React (Vite), Redux Toolkit, React Router, Tailwind CSS, Axios, react-hot-toast
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── models/        (User, Task)
│   ├── routes/         (auth, tasks)
│   ├── middleware/auth.js
│   ├── utils/generateToken.js
│   ├── seed.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/axios.js
        ├── store/       (Redux store + slices)
        ├── components/  (Navbar, TaskForm, TaskItem, ProtectedRoute)
        └── pages/       (Login, Register, Dashboard)
```

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI (MongoDB Atlas connection string) and JWT_SECRET
npm run seed     # optional: creates a demo user with sample tasks
npm run dev
```

Backend runs on `http://localhost:5000`.

Seeded account (if you ran `npm run seed`):
- Email: `demo@taskmanager.com`
- Password: `demo123`

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL should point to your backend, e.g. http://localhost:5000/api
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Deployment

- **Backend:** Render or Railway + MongoDB Atlas
- **Frontend:** Vercel or Netlify (set `VITE_API_URL` to your deployed backend URL)

## API Overview

| Method | Route              | Description             | Auth |
|--------|--------------------|--------------------------|------|
| POST   | /api/auth/register  | Register a new user      | Public |
| POST   | /api/auth/login      | Log in                   | Public |
| GET    | /api/auth/profile    | Get logged-in user       | User |
| GET    | /api/tasks            | List tasks (?status=)    | User |
| POST   | /api/tasks            | Create a task             | User |
| PUT    | /api/tasks/:id          | Update a task             | Owner |
| DELETE | /api/tasks/:id          | Delete a task             | Owner |

## Resume Bullet Points

- Built a full-stack task management app using MongoDB, Express.js, React.js and Node.js (MERN stack)
- Implemented JWT authentication with bcrypt password hashing
- Designed RESTful APIs for task CRUD operations with per-user data isolation
- Managed global application state using Redux Toolkit for auth and task data
- Built status-based task workflow (To Do / In Progress / Done) with priority levels and due dates
- Styled a responsive UI using Tailwind CSS
