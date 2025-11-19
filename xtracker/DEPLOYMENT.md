# Deployment Guide

This guide covers deploying the Expense Tracker application to Render (backend) and Vercel (frontend).

## Prerequisites

- GitHub/GitLab/Bitbucket account
- MongoDB Atlas account (free tier available)
- Render account (free tier available)
- Vercel account (free tier available)

## Backend Deployment (Render)

### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user:
   - Go to Database Access → Add New Database User
   - Choose Password authentication
   - Save the username and password
4. Whitelist IP addresses:
   - Go to Network Access → Add IP Address
   - For Render, add `0.0.0.0/0` (allows all IPs) or Render's specific IPs
5. Get your connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/xtracker`

### Step 2: Deploy to Render

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure the service:
   - **Name**: `xtracker-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xtracker
   JWT_SECRET=your-strong-random-secret-key-here
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=3000
   ```
7. Click "Create Web Service"
8. Wait for deployment to complete
9. Copy your backend URL (e.g., `https://xtracker-backend.onrender.com`)

### Step 3: Test Backend

Visit `https://your-backend-url.onrender.com/health` to verify it's running.

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Ensure your frontend code is pushed to GitHub/GitLab/Bitbucket
2. Note your backend URL from Render (e.g., `https://xtracker-backend.onrender.com`)

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your repository
4. Configure the project:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace `your-backend-url.onrender.com` with your actual Render backend URL
6. Click "Deploy"
7. Wait for deployment to complete
8. Copy your frontend URL (e.g., `https://xtracker.vercel.app`)

### Step 3: Update Backend CORS

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable to your Vercel URL:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Render will automatically redeploy

### Step 4: Test Application

1. Visit your Vercel frontend URL
2. Create a new account
3. Test adding expenses
4. Verify everything works

## Environment Variables Summary

### Backend (Render)
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Strong random string for JWT signing
- `FRONTEND_URL` - Your Vercel frontend URL
- `NODE_ENV` - `production`
- `PORT` - `3000` (Render sets this automatically)

### Frontend (Vercel)
- `VITE_API_URL` - Your Render backend URL (e.g., `https://xtracker-backend.onrender.com`)

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Failed**
   - Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Check connection string format
   - Verify database user credentials

2. **CORS Errors**
   - Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly
   - Check for trailing slashes

3. **Service Spinning Down**
   - Render free tier services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading to paid tier for always-on service

### Frontend Issues

1. **API Connection Failed**
   - Verify `VITE_API_URL` is set correctly in Vercel
   - Check backend is running and accessible
   - Verify CORS is configured correctly

2. **Build Errors**
   - Check Node.js version compatibility
   - Review build logs in Vercel dashboard

## Security Notes

- Never commit `.env` files to version control
- Use strong, random JWT_SECRET (minimum 32 characters)
- Keep MongoDB credentials secure
- Regularly update dependencies
- Use HTTPS in production (both Render and Vercel provide this)

## Post-Deployment

1. Test all features:
   - User signup/login
   - Adding expenses
   - Viewing expenses
   - Deleting expenses
   - Reports and analytics

2. Monitor:
   - Render logs for backend errors
   - Vercel analytics for frontend performance
   - MongoDB Atlas for database usage

3. Set up custom domains (optional):
   - Render: Add custom domain in service settings
   - Vercel: Add custom domain in project settings

## Support

For issues:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

