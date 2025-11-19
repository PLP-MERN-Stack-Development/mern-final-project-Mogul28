# Expense Tracker Backend API

Backend API for the Expense Tracker application, hosted on Render. Uses MongoDB for data persistence.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/xtracker
```

   For MongoDB Atlas (cloud), use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xtracker
   ```

3. Make sure MongoDB is running:
   - **Local MongoDB**: Install and start MongoDB locally
   - **MongoDB Atlas**: Create a free cluster at https://www.mongodb.com/cloud/atlas

4. Run the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. (Optional) Seed the database with sample data:
```bash
npm run seed
```

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/xtracker`

### Option 2: MongoDB Atlas (Recommended for Production)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for Render)
5. Get your connection string and add it to `.env` as `MONGODB_URI`

## API Endpoints

- `GET /health` - Health check (includes database connection status)
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/categories` - Get list of categories

## Deployment on Render

### Using render.yaml (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Render
3. Render will automatically detect `render.yaml` in the `backend` directory
4. Add the following environment variables in Render dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - A strong random string for JWT token signing
   - `FRONTEND_URL` - Your Netlify frontend URL (e.g., `https://xtrackerapp.netlify.app`)
   - `NODE_ENV` - Set to `production` (already in render.yaml)
   - `PORT` - Port number (Render sets this automatically)

### Manual Setup

1. Connect your repository to Render
2. Create a new Web Service
3. Set the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. Add environment variables (same as above)

### Important Notes

- Use MongoDB Atlas for production (free tier available)
- Generate a strong JWT_SECRET (use a random string generator)
- Set FRONTEND_URL to your Netlify deployment URL for proper CORS
- Render free tier services spin down after 15 minutes of inactivity

