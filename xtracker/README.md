# Expense Tracker

A modern expense tracking application with separate backend and frontend.

## Project Structure

```
xtracker/
├── backend/          # Backend API (Node.js/Express) - Hosted on Render
└── frontend/         # Frontend (React/Vite) - Hosted on Vercel
```

## Backend

The backend is a Node.js/Express API that provides REST endpoints for managing expenses.

- **Location**: `backend/`
- **Hosting**: Render
- **Tech Stack**: Node.js, Express, CORS

See [backend/README.md](backend/README.md) for more details.

## Frontend

The frontend is a React application built with Vite.

- **Location**: `frontend/`
- **Hosting**: Vercel
- **Tech Stack**: React, Vite, Tailwind CSS

See [frontend/README.md](frontend/README.md) for more details.

## Development

### Running Locally

**Important:** You need to run both the backend and frontend servers in separate terminals.

1. **Start the backend** (Terminal 1):
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend will run on `http://localhost:3000`
   
   Verify it's working: Open `http://localhost:3000/health` in your browser

2. **Start the frontend** (Terminal 2):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`
   
   The frontend will automatically use the Vite proxy to connect to the backend in development.

**Note:** If you see connection errors, make sure the backend server is running first!

See [START.md](START.md) for detailed troubleshooting.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for a complete step-by-step deployment guide.

### Quick Overview

**Backend (Render)**
- Deploy to Render using `render.yaml` configuration
- Requires MongoDB Atlas connection
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`

**Frontend (Vercel)**
- Deploy to Vercel (auto-detects Vite)
- Environment variable: `VITE_API_URL` (your Render backend URL)

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Features

- Add, view, and delete expenses
- Categorize expenses
- View expenses by category, vendor, and time period
- Real-time statistics and reports
- Responsive design
