# Environment Variables Setup

This guide explains how to set up environment variables for XTracker.

## Backend Environment Variables

Create a `.env` file in the `xtracker/backend/` directory:

```env
# MongoDB Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xtracker

# JWT Secret Key
# Use a strong random string (minimum 32 characters)
# Generate with: openssl rand -base64 32
JWT_SECRET=your-strong-random-secret-key-change-in-production

# Frontend URL (for CORS)
# Development: http://localhost:5173
# Production: https://your-frontend.netlify.app
FRONTEND_URL=http://localhost:5173

# Environment
# Options: development, production, test
NODE_ENV=development

# Port
# Default: 3000
PORT=3000

# Sentry DSN (Optional)
# Get from https://sentry.io
SENTRY_DSN=your_sentry_dsn_here
```

## Frontend Environment Variables

Create a `.env` file in the `xtracker/frontend/` directory:

```env
# Backend API URL
# Development: http://localhost:3000
# Production: https://your-backend.onrender.com
VITE_API_URL=http://localhost:3000

# Sentry DSN (Optional)
# Get from https://sentry.io
# Note: Must start with VITE_ to be accessible in frontend
VITE_SENTRY_DSN=your_sentry_dsn_here
```

## Important Notes

### Vite Environment Variables

- Frontend environment variables **must** start with `VITE_` to be accessible in the React app
- Access in code: `import.meta.env.VITE_API_URL`
- Variables are embedded at build time

### Backend Environment Variables

- Backend uses `dotenv` package
- Access in code: `process.env.VARIABLE_NAME`
- Never commit `.env` files to version control

### Production Setup

#### Render (Backend)

1. Go to your service dashboard
2. Navigate to "Environment" tab
3. Add each variable:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV` = `production`
   - `SENTRY_DSN` (optional)

#### Netlify (Frontend)

1. Go to your site dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add each variable:
   - `VITE_API_URL`
   - `VITE_SENTRY_DSN` (optional)
4. Redeploy after adding variables

## Generating Secure Secrets

### JWT Secret

**Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Online Generator:**
- Use a secure random string generator
- Minimum 32 characters recommended

## Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use `.env.example` as template

2. **Use strong secrets**
   - JWT_SECRET: Minimum 32 characters
   - Use cryptographically secure random generators

3. **Rotate secrets regularly**
   - Change JWT_SECRET periodically
   - Update all environments when rotating

4. **Separate environments**
   - Use different secrets for development/production
   - Never use production secrets in development

5. **Limit access**
   - Only team members who need access
   - Use environment-specific access controls

## Troubleshooting

### Variables Not Working

1. **Backend:**
   - Restart server after adding variables
   - Check `.env` file location
   - Verify `dotenv.config()` is called

2. **Frontend:**
   - Rebuild after adding variables (`npm run build`)
   - Check variable name starts with `VITE_`
   - Verify variable is in `.env` file

### Common Mistakes

- ❌ Using `process.env` in frontend (use `import.meta.env`)
- ❌ Forgetting `VITE_` prefix in frontend
- ❌ Committing `.env` files
- ❌ Using weak secrets
- ❌ Sharing secrets in code/comments

### 500 Internal Server Error

If you're getting a 500 error when trying to sign up or login:

1. **Check MongoDB Connection:**
   - Verify `MONGODB_URI` is set correctly
   - Test connection: Visit `http://localhost:3000/health` (should show database: "connected")
   - Check MongoDB Atlas IP whitelist includes your IP or `0.0.0.0/0`

2. **Check Environment Variables:**
   - Ensure `MONGODB_URI` is set in your `.env` file (local) or Render dashboard (production)
   - Verify `JWT_SECRET` is set (optional but recommended)
   - Restart the server after adding environment variables

3. **Check Server Logs:**
   - Look for "MongoDB connection error" messages
   - Check for "MONGODB_URI is not defined" errors
   - Verify the server started successfully

4. **Database Connection Issues:**
   - If using MongoDB Atlas, ensure cluster is running
   - Check network access settings in MongoDB Atlas
   - Verify connection string format is correct

---

**Remember**: Keep your `.env` files secure and never commit them to version control!

