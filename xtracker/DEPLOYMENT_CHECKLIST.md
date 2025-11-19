# Deployment Checklist

Use this checklist to ensure your XTracker application is fully deployed and ready for production.

## Pre-Deployment

### Backend Setup

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with appropriate permissions
- [ ] Network access configured (IP whitelist: `0.0.0.0/0` for Render)
- [ ] Connection string obtained and tested
- [ ] Strong JWT_SECRET generated (minimum 32 characters)
- [ ] Backend code pushed to GitHub

### Frontend Setup

- [ ] Frontend code pushed to GitHub
- [ ] Backend URL noted for environment variable
- [ ] All dependencies installed and tested locally

## Deployment Steps

### 1. Backend Deployment (Render)

- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure service:
  - [ ] Name: `xtracker-backend`
  - [ ] Root Directory: `xtracker/backend`
  - [ ] Environment: `Node`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `MONGODB_URI` - Your MongoDB Atlas connection string
  - [ ] `JWT_SECRET` - Strong random secret
  - [ ] `FRONTEND_URL` - Will update after frontend deployment
  - [ ] `NODE_ENV` - `production`
  - [ ] `SENTRY_DSN` - (Optional) Sentry DSN
- [ ] Deploy service
- [ ] Test health endpoint: `https://your-backend.onrender.com/health`
- [ ] Copy backend URL for frontend configuration

### 2. Frontend Deployment (Netlify)

- [ ] Create Netlify account
- [ ] Import GitHub repository
- [ ] Configure project:
  - [ ] Base Directory: `xtracker/frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Publish Directory: `dist`
  - [ ] Framework: `Vite` (auto-detected)
- [ ] Add environment variables:
  - [ ] `VITE_API_URL` - Your Render backend URL
  - [ ] `VITE_SENTRY_DSN` - (Optional) Sentry DSN
- [ ] Deploy project
- [ ] Copy frontend URL

**Note:** The `netlify.toml` file will automatically configure build settings and SPA routing.

### 3. Update Backend CORS

- [ ] Go back to Render dashboard
- [ ] Update `FRONTEND_URL` environment variable with Netlify URL
- [ ] Service will automatically redeploy

### 4. Testing

- [ ] Visit frontend URL
- [ ] Create a test account
- [ ] Add a test expense
- [ ] View dashboard
- [ ] Check reports
- [ ] Test all CRUD operations
- [ ] Verify data persistence

## Post-Deployment

### Monitoring Setup

- [ ] Set up Sentry (if using)
  - [ ] Create Sentry account
  - [ ] Create backend project
  - [ ] Create frontend project
  - [ ] Add DSNs to environment variables
  - [ ] Redeploy both services
- [ ] Set up uptime monitoring
  - [ ] Configure health check endpoint
  - [ ] Set up alerts

### Documentation

- [ ] Update README.md with:
  - [ ] Live frontend URL
  - [ ] Live backend URL
  - [ ] Video demo link
  - [ ] Screenshots
- [ ] Verify all documentation links work
- [ ] Test API documentation

### CI/CD Setup

- [ ] Configure GitHub Secrets:
  - [ ] `RENDER_SERVICE_ID` (if using Render API)
  - [ ] `RENDER_API_KEY` (if using Render API)
  - [ ] `NETLIFY_AUTH_TOKEN` (optional, for Netlify CLI deployment)
  - [ ] `VITE_API_URL` (for frontend tests)
- [ ] Test CI/CD pipeline
- [ ] Verify tests run on push

### Security Checklist

- [ ] All environment variables set correctly
- [ ] No secrets in code
- [ ] HTTPS enabled (automatic on Netlify/Render)
- [ ] CORS configured correctly
- [ ] Strong JWT_SECRET in production
- [ ] MongoDB credentials secure

### Performance

- [ ] Test application load time
- [ ] Verify API response times
- [ ] Check database connection pooling
- [ ] Monitor resource usage

## Final Verification

- [ ] Application accessible online
- [ ] All features working
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Documentation complete
- [ ] Video demo created and linked
- [ ] README.md updated
- [ ] GitHub repository public/accessible

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify `FRONTEND_URL` in backend matches frontend URL exactly
   - Check for trailing slashes

2. **Database Connection Failed**
   - Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Check connection string format
   - Verify database user credentials

3. **Build Failures**
   - Check Node.js version compatibility
   - Review build logs
   - Verify all dependencies in package.json

4. **Environment Variables Not Working**
   - Restart services after adding variables
   - Check variable names (case-sensitive)
   - Verify Vite variables start with `VITE_`

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Sentry Documentation](https://docs.sentry.io)

---

**Last Updated**: January 2024

