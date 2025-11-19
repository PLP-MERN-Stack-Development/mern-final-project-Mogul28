# Quick Start Guide

## Starting the Application

You need to run both the backend and frontend servers for the app to work.

### Option 1: Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```
Backend will run on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Using npm scripts (if you add them to root package.json)

You can add these scripts to a root `package.json` to run both:

```json
{
  "scripts": {
    "dev:backend": "cd backend && npm start",
    "dev:frontend": "cd frontend && npm run dev",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

Then run: `npm run dev`

## Troubleshooting

### Error: "Cannot connect to backend server"

This means the backend is not running. Make sure:
1. You've started the backend server (Terminal 1)
2. The backend is running on port 3000
3. No other application is using port 3000

### Error: "ERR_CONNECTION_REFUSED"

Same as above - the backend server needs to be running.

### Port Already in Use

If port 3000 or 5173 is already in use:
- Backend: Change `PORT` in `backend/.env` or set `PORT=3001` in your environment
- Frontend: Vite will automatically try the next available port

## Verifying Everything Works

1. Backend health check: Open `http://localhost:3000/health` in your browser
   - Should return: `{"status":"ok","message":"Expense Tracker API is running"}`

2. Frontend: Open `http://localhost:5173` in your browser
   - Should show the expense tracker interface
   - If backend is running, expenses will load
   - If backend is not running, you'll see a helpful error message

