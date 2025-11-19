# Troubleshooting 500 Internal Server Error on Login/Signup

## Understanding the Error

When you see a **500 Internal Server Error** when trying to login or signup, it typically means one of the following:

1. **Backend server is not running**
2. **Database connection is not configured or MongoDB is not running**
3. **Missing or incorrect environment variables**

## Root Cause

The most common cause is that the backend server cannot connect to MongoDB because:
- The `.env` file is missing or doesn't have `MONGODB_URI` set
- MongoDB is not running (if using local MongoDB)
- The MongoDB connection string is incorrect

## Solution Steps

### Step 1: Check if Backend Server is Running

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd xtracker/backend
   ```

2. Check if the server is running by visiting:
   ```
   http://localhost:3000/health
   ```
   
   If you get a connection error, the backend is not running.

3. Start the backend server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Step 2: Create/Check `.env` File

1. In the `xtracker/backend/` directory, create a `.env` file if it doesn't exist.

2. Add the following content (adjust for your setup):

   **For Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/xtracker
   JWT_SECRET=your-strong-random-secret-key-change-in-production
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

   **For MongoDB Atlas (Cloud):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xtracker
   JWT_SECRET=your-strong-random-secret-key-change-in-production
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

3. **Important**: Replace the placeholder values:
   - `MONGODB_URI`: Your actual MongoDB connection string
   - `JWT_SECRET`: Generate a strong random string (see below)

### Step 3: Generate JWT Secret

Generate a secure JWT secret using one of these methods:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Using OpenSSL:**
```bash
openssl rand -base64 32
```

Copy the output and use it as your `JWT_SECRET` value.

### Step 4: Ensure MongoDB is Running

**If using Local MongoDB:**
1. Make sure MongoDB is installed and running
2. Check MongoDB service status:
   - Windows: Check Services app or run `net start MongoDB`
   - Mac/Linux: `brew services list` or `sudo systemctl status mongod`

**If using MongoDB Atlas:**
1. Ensure your cluster is running
2. Check that your IP address is whitelisted in MongoDB Atlas
3. Verify your connection string is correct

### Step 5: Restart the Backend Server

After creating/updating the `.env` file:
1. Stop the backend server (Ctrl+C)
2. Start it again:
   ```bash
   npm start
   ```

3. Check the console output - you should see:
   ```
   MongoDB Connected: ...
   Server is running on port 3000
   ```

### Step 6: Verify the Fix

1. Visit `http://localhost:3000/health` in your browser
   - Should return: `{"status":"ok","message":"Expense Tracker API is running","database":"connected"}`

2. Try logging in or signing up again from the frontend

## Improved Error Messages

The auth routes have been updated to provide better error messages. When a database connection error occurs, you'll now see:

- **503 Service Unavailable** instead of 500
- Clear error message: "Database connection failed. Please ensure MongoDB is running and MONGODB_URI is set correctly."
- In development mode, additional details including connection state and hints

## Common Issues

### Issue: "MONGODB_URI is not defined"
**Solution**: Create a `.env` file in `xtracker/backend/` with the `MONGODB_URI` variable.

### Issue: "connect ECONNREFUSED"
**Solution**: 
- MongoDB is not running (if local)
- MongoDB Atlas IP whitelist doesn't include your IP
- Connection string is incorrect

### Issue: "Authentication failed"
**Solution**: 
- Check MongoDB Atlas username/password in connection string
- Ensure database user has proper permissions

### Issue: Backend server won't start
**Solution**: 
- Check that port 3000 is not already in use
- Verify all dependencies are installed: `npm install`
- Check console for specific error messages

## Testing the Connection

You can test your MongoDB connection using the health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Expense Tracker API is running",
  "database": "connected"
}
```

If `"database": "disconnected"`, check your MongoDB connection.

## Still Having Issues?

1. Check the backend server console for detailed error messages
2. Verify your `.env` file is in the correct location: `xtracker/backend/.env`
3. Ensure there are no typos in environment variable names
4. Check that MongoDB is accessible from your machine
5. Review the `ENV_SETUP.md` file for more detailed setup instructions

## Quick Checklist

- [ ] Backend server is running on port 3000
- [ ] `.env` file exists in `xtracker/backend/` directory
- [ ] `MONGODB_URI` is set in `.env` file
- [ ] `JWT_SECRET` is set in `.env` file
- [ ] MongoDB is running (local) or accessible (Atlas)
- [ ] Health endpoint shows `"database": "connected"`
- [ ] Backend server was restarted after creating/updating `.env`

