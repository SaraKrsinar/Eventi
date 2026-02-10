# 🎉 Eventi

**Eventi** is a modern event planning web application that helps users organize events, manage tasks, and stay in control of every detail without stress.

The project is built as a **full-stack application** with a React (Vite) frontend and a .NET backend, deployed as a real production system.

---

## 🌐 Live Demo

- **Frontend:** https://eventi-nine.vercel.app  
- **Backend API:** https://eventi-backend.onrender.com  

> ⚠️ Note: The backend runs on a free Render instance, so the first request may take up to ~30–50 seconds due to cold start.

---

## 🧩 Features

- Create, view, update, and delete events
- Manage event-related tasks
- Clean and minimal UI with a modern design
- RESTful API architecture
- Fully deployed frontend and backend
- Environment-based configuration
- Production-ready setup

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS / Tailwind-style UI
- Fetch API
- Deployed on Vercel

### Backend
- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core
- SQLite
- Docker
- Swagger
- CORS enabled
- RESTful Controllers

---

## 🏗️ Project Structure

```
Eventi/
├── eventi-frontend/
├── eventi-backend/
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_BASE_URL=https://eventi-backend.onrender.com/api/events
```

---

### Backend (Render)

```env
ConnectionStrings__DefaultConnection=Data Source=/app/EventiDB.db
```

---

## 🚀 Running Locally

### Backend

```bash
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
npm install
npm run dev
```

---

## 📦 Deployment

- Frontend: Vercel
- Backend: Render (Docker)
- Database: SQLite

---

## 👩‍💻 Author

**Sara Krshinar**  
Software Engineer  
GitHub: https://github.com/SaraKrsinar

---

✨ *Plan your events. Enjoy the moments.*
