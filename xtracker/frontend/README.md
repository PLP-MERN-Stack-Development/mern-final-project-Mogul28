# Expense Tracker Frontend

Frontend application for the Expense Tracker, built with React and Vite, hosted on Vercel.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

## Deployment on Vercel

### Quick Setup

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace with your actual Render backend URL
7. Click "Deploy"
8. Wait for deployment to complete

### After Deployment

1. Copy your Vercel frontend URL
2. Update your backend `FRONTEND_URL` environment variable in Render to match your Vercel URL
3. This ensures proper CORS configuration

## Environment Variables

- `VITE_API_URL` - Backend API URL
  - **Development**: Leave empty to use Vite proxy (defaults to `http://localhost:3000`)
  - **Production**: Your Render backend URL (e.g., `https://xtracker-backend.onrender.com`)

## Build

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

For detailed deployment instructions, see [../DEPLOYMENT.md](../DEPLOYMENT.md).

