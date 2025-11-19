# Expense Tracker Frontend

Frontend application for the Expense Tracker, built with React and Vite, hosted on Netlify.

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

## Deployment on Netlify

### Quick Setup

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Base directory**: `xtracker/frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://xtracker-app.onrender.com
   ```
7. Click "Deploy site"
8. Wait for deployment to complete

### After Deployment

1. Copy your Netlify frontend URL (e.g., `https://xtrackerapp.netlify.app`)
2. Update your backend `FRONTEND_URL` environment variable in Render to match your Netlify URL
3. This ensures proper CORS configuration

## Environment Variables

- `VITE_API_URL` - Backend API URL
  - **Development**: Leave empty to use Vite proxy (defaults to `http://localhost:3000`)
  - **Production**: Your Render backend URL (e.g., `https://xtracker-app.onrender.com`)

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

