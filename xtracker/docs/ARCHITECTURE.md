# XTracker Technical Architecture

## Overview

XTracker is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed for expense tracking and financial management. This document provides a comprehensive overview of the technical architecture, design decisions, and system components.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Database Design](#database-design)
7. [Authentication & Security](#authentication--security)
8. [API Design](#api-design)
9. [Deployment Architecture](#deployment-architecture)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Monitoring & Error Tracking](#monitoring--error-tracking)
12. [Performance Considerations](#performance-considerations)
13. [Security Measures](#security-measures)
14. [Future Enhancements](#future-enhancements)

---

## System Architecture

### High-Level Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Client    │────────▶│  Frontend   │────────▶│   Backend   │
│  (Browser)  │         │  (Netlify)   │         │  (Render)   │
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                       │
                                                       ▼
                                                ┌─────────────┐
                                                │   MongoDB   │
                                                │   Atlas     │
                                                └─────────────┘
```

### Component Interaction Flow

1. **User Request**: Client browser sends request to frontend
2. **Frontend Processing**: React app processes request and makes API call
3. **API Request**: Frontend sends HTTP request to backend API
4. **Backend Processing**: Express.js server processes request, validates, authenticates
5. **Database Query**: MongoDB query executed
6. **Response**: Data flows back through the stack to the client

---

## Technology Stack

### Frontend

- **Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Testing**: Vitest, React Testing Library
- **Error Tracking**: Sentry

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: MongoDB (via Mongoose 8.0)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware
- **Testing**: Jest, Supertest
- **Error Tracking**: Sentry

### Infrastructure

- **Frontend Hosting**: Netlify
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions
- **Version Control**: Git/GitHub

---

## Project Structure

```
xtracker/
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   │   └── database.js     # MongoDB connection
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # JWT authentication
│   ├── models/             # Mongoose models
│   │   ├── User.js         # User model
│   │   └── Expense.js      # Expense model
│   ├── routes/             # API routes
│   │   └── auth.js         # Authentication routes
│   ├── scripts/            # Utility scripts
│   │   └── seed.js         # Database seeding
│   ├── __tests__/          # Test files
│   ├── server.js           # Express server entry point
│   ├── package.json        # Dependencies
│   └── render.yaml         # Render deployment config
│
├── frontend/               # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js      # API client
│   │   │   └── calculations.js
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── __tests__/          # Test files
│   ├── package.json        # Dependencies
│   └── vite.config.js      # Vite configuration
│
├── docs/                   # Documentation
│   ├── API.md             # API documentation
│   ├── USER_GUIDE.md      # User guide
│   └── ARCHITECTURE.md    # This file
│
└── .github/
    └── workflows/         # CI/CD pipelines
        ├── backend-ci.yml
        └── frontend-ci.yml
```

---

## Backend Architecture

### Server Setup

The Express.js server is configured with:

- **CORS**: Configured for production and development
- **JSON Parsing**: Express JSON middleware
- **Error Handling**: Global error handler with Sentry integration
- **Health Check**: `/health` endpoint for monitoring

### Route Structure

```
/api/auth
  ├── POST /signup      # User registration
  └── POST /login       # User authentication

/api/expenses
  ├── GET    /          # Get all user expenses
  ├── GET    /:id       # Get expense by ID
  ├── POST   /          # Create expense
  ├── PUT    /:id       # Update expense
  └── DELETE /:id       # Delete expense

/api/categories
  └── GET    /          # Get expense categories
```

### Middleware

1. **Authentication Middleware** (`protect`):
   - Validates JWT token
   - Extracts user information
   - Attaches user to request object

2. **Error Handling**:
   - Catches and logs errors
   - Sends appropriate HTTP status codes
   - Integrates with Sentry for error tracking

### Database Connection

- Uses Mongoose ODM for MongoDB
- Connection pooling for performance
- Graceful error handling and reconnection logic

---

## Frontend Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── Main Content
│       ├── Dashboard
│       ├── Expenses
│       ├── Reports
│       └── MyAccount
└── Login (when not authenticated)
```

### State Management

- **Local State**: React hooks (useState) for component-level state
- **Global State**: Context API or props drilling (can be enhanced with Redux/Zustand)
- **Persistent State**: localStorage for authentication tokens

### API Client

Centralized API client (`utils/api.js`) handles:
- Base URL configuration
- Authentication headers
- Request/response interceptors
- Error handling
- Fallback to mock data (development)

### Routing

- Client-side routing handled by React Router (if implemented)
- Protected routes require authentication
- Automatic redirect to login if not authenticated

---

## Database Design

### User Schema

```javascript
{
  name: String (required, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, minlength: 6, hashed),
  timestamps: { createdAt, updatedAt }
}
```

### Expense Schema

```javascript
{
  user: ObjectId (required, ref: 'User'),
  category: String (required, trimmed),
  description: String (required, trimmed),
  date: String (required, ISO date format),
  vendor: String (required, trimmed),
  amount: Number (required, min: 0),
  timestamps: { createdAt, updatedAt }
}
```

### Relationships

- **One-to-Many**: User → Expenses
- Expenses are scoped to users (user isolation)
- Indexes on user field for query performance

---

## Authentication & Security

### Authentication Flow

1. User registers/logs in
2. Backend validates credentials
3. JWT token generated (30-day expiration)
4. Token stored in localStorage (frontend)
5. Token included in Authorization header for protected routes
6. Backend validates token on each request

### Security Measures

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Signed with secret key
3. **CORS**: Restricted to frontend domain in production
4. **Input Validation**: Server-side validation for all inputs
5. **SQL Injection Prevention**: Mongoose parameterized queries
6. **XSS Protection**: React's built-in XSS protection
7. **HTTPS**: Enforced in production (Netlify/Render)

---

## API Design

### RESTful Principles

- **GET**: Retrieve resources
- **POST**: Create resources
- **PUT**: Update resources
- **DELETE**: Remove resources

### Response Format

**Success Response:**
```json
{
  "id": "...",
  "data": "..."
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

### Status Codes

- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

---

## Deployment Architecture

### Frontend (Netlify)

- **Build**: Vite production build
- **Output**: Static files in `dist/`
- **Environment Variables**: `VITE_API_URL`
- **CDN**: Global CDN for fast delivery
- **HTTPS**: Automatic SSL certificates

### Backend (Render)

- **Runtime**: Node.js 18+
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `FRONTEND_URL`
  - `NODE_ENV`
  - `SENTRY_DSN` (optional)

### Database (MongoDB Atlas)

- **Cloud**: MongoDB Atlas
- **Connection**: Connection string with authentication
- **Backup**: Automated backups (Atlas feature)
- **Scaling**: Auto-scaling available

---

## CI/CD Pipeline

### GitHub Actions Workflows

#### Backend CI/CD (`.github/workflows/backend-ci.yml`)

1. **Test Job**:
   - Runs on push/PR to main/develop
   - Sets up MongoDB service
   - Installs dependencies
   - Runs linter
   - Executes test suite
   - Generates coverage report

2. **Deploy Job**:
   - Runs after successful tests
   - Only on main branch
   - Deploys to Render

#### Frontend CI/CD (`.github/workflows/frontend-ci.yml`)

1. **Test Job**:
   - Runs on push/PR to main/develop
   - Installs dependencies
   - Runs linter
   - Executes test suite
   - Builds production bundle

2. **Deploy Job**:
   - Runs after successful tests
   - Only on main branch
   - Deploys to Netlify

---

## Monitoring & Error Tracking

### Sentry Integration

**Backend:**
- Error tracking for server-side errors
- Performance monitoring
- Request tracing

**Frontend:**
- Client-side error tracking
- User session replay
- Performance monitoring

### Health Checks

- `/health` endpoint for backend monitoring
- Database connection status
- Can be used with uptime monitors

---

## Performance Considerations

### Frontend

- **Code Splitting**: Vite automatic code splitting
- **Lazy Loading**: React lazy loading for routes
- **Image Optimization**: Optimized assets
- **Caching**: Browser caching for static assets

### Backend

- **Database Indexing**: Indexes on frequently queried fields
- **Connection Pooling**: Mongoose connection pooling
- **Response Compression**: Can be added with compression middleware
- **Caching**: Can implement Redis for frequently accessed data

### Database

- **Query Optimization**: Efficient queries with proper indexes
- **Connection Pooling**: Managed by Mongoose
- **Atlas Features**: Auto-scaling, performance advisor

---

## Security Measures

1. **Authentication**: JWT-based authentication
2. **Authorization**: User-scoped data access
3. **Password Security**: bcrypt hashing
4. **CORS**: Restricted origins
5. **Input Validation**: Server-side validation
6. **Error Handling**: No sensitive data in error messages
7. **Environment Variables**: Secrets stored securely
8. **HTTPS**: Enforced in production

---

## Future Enhancements

### Short-term

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Export to CSV/Excel
- [ ] Budget tracking
- [ ] Recurring expenses

### Medium-term

- [ ] Receipt photo upload
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Data export/import

### Long-term

- [ ] Multi-user collaboration
- [ ] Bank account integration
- [ ] AI-powered categorization
- [ ] Predictive analytics
- [ ] Mobile native apps

---

## Development Workflow

1. **Local Development**:
   - Backend: `npm run dev` (port 3000)
   - Frontend: `npm run dev` (port 5173)
   - MongoDB: Local or Atlas

2. **Testing**:
   - Backend: `npm test`
   - Frontend: `npm test`
   - Coverage: `npm run test:coverage`

3. **Deployment**:
   - Push to main branch
   - CI/CD pipeline runs automatically
   - Tests must pass before deployment

---

## Conclusion

XTracker is built with modern web technologies following best practices for scalability, security, and maintainability. The architecture supports future enhancements and can scale with user growth.

---

**Last Updated**: January 2024  
**Version**: 1.0.0

