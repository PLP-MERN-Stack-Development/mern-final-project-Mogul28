# Monitoring and Error Tracking Setup

## Sentry Integration

XTracker uses Sentry for error tracking and monitoring in both frontend and backend.

### Setting Up Sentry

1. **Create a Sentry Account**
   - Go to [sentry.io](https://sentry.io)
   - Sign up for a free account
   - Create a new project

2. **Get Your DSN**
   - After creating a project, Sentry will provide a DSN (Data Source Name)
   - Copy the DSN for your project

### Backend Configuration

1. **Add Environment Variable**
   - In Render dashboard, add:
     ```
     SENTRY_DSN=your_backend_sentry_dsn_here
     ```

2. **Verify Integration**
   - Check `backend/server.js` for Sentry initialization
   - Errors will automatically be sent to Sentry

### Frontend Configuration

1. **Add Environment Variable**
   - In Netlify dashboard, add:
     ```
     VITE_SENTRY_DSN=your_frontend_sentry_dsn_here
     ```

2. **Verify Integration**
   - Check `frontend/src/main.jsx` for Sentry initialization
   - Client-side errors will be tracked

### Local Development

For local development, add the DSN to your `.env` files:

**Backend `.env`:**
```
SENTRY_DSN=your_backend_sentry_dsn_here
```

**Frontend `.env`:**
```
VITE_SENTRY_DSN=your_frontend_sentry_dsn_here
```

### Features

- **Error Tracking**: Automatic error capture
- **Performance Monitoring**: Track API response times
- **User Session Replay**: Debug user issues (frontend)
- **Alerts**: Get notified of critical errors
- **Release Tracking**: Track errors by deployment version

### Health Checks

The backend includes a health check endpoint:

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "message": "Expense Tracker API is running",
  "database": "connected"
}
```

You can use this endpoint with uptime monitoring services like:
- UptimeRobot
- Pingdom
- StatusCake

### Monitoring Best Practices

1. **Set Up Alerts**: Configure Sentry to alert on critical errors
2. **Monitor Performance**: Track slow API endpoints
3. **Review Regularly**: Check Sentry dashboard weekly
4. **Health Checks**: Set up uptime monitoring for the `/health` endpoint

