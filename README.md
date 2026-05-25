# QuickLink URL Shortener

QuickLink is a modern full-stack MERN application for shortening URLs. It features a beautiful React frontend styled with Tailwind CSS (v3) and a robust Node.js/Express backend.

## Features
- Clean, responsive, and modern UI (Dark/Light mode support)
- Real-time URL shortening
- Click tracking and analytics (Dashboard)
- RESTful API
- MongoDB integration

## Project Structure
- `/frontend`: React application built with Vite and Tailwind CSS.
- `/backend`: Node.js Express server and MongoDB models.

---

## Setup & Installation

### Prerequisites
- Node.js installed
- MongoDB installed locally or an Atlas connection string.

### 1. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Copy the `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```
Ensure `MONGO_URI` is set correctly.

Start the Backend Server:
```bash
npm run dev
```
The server will start on port 5000.

### 2. Frontend Setup
Navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the Frontend Server:
```bash
npm run dev
```
The application will be running on `http://localhost:5173`.

---

## Deployment Steps

### Backend (Render)
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com).
3. Create a new **Web Service**.
4. Connect your GitHub repository.
5. Set the following options:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add your Environment Variables (e.g., `MONGO_URI`, `BASE_URL`).
7. Click **Create Web Service**.

### Frontend (Vercel)
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. Set the following options:
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. *Important*: Update the backend API URL in your React app (replace `http://localhost:5000` with your deployed Render URL). You can use `.env` files in Vite to manage API URLs per environment.
6. Click **Deploy**.

Enjoy your QuickLink app!
