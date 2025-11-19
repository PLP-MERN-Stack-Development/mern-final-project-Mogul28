# XTracker - Expense Tracking Application

<div align="center">



**A modern, full-stack expense tracking application built with the MERN stack**



</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Monitoring](#monitoring)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

XTracker is a comprehensive expense tracking application that helps users manage and analyze their spending. Built with modern web technologies, it provides an intuitive interface for tracking expenses, viewing analytics, and understanding spending patterns.

### Key Highlights

- ✅ **Full-Stack MERN Application** - MongoDB, Express.js, React, Node.js
- ✅ **Production Ready** - Deployed and accessible online
- ✅ **Secure Authentication** - JWT-based authentication with password hashing
- ✅ **Comprehensive Testing** - Unit and integration tests with 70%+ coverage
- ✅ **CI/CD Pipeline** - Automated testing and deployment
- ✅ **Error Tracking** - Sentry integration for monitoring
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices

---

## ✨ Features

### Core Functionality

- 🔐 **User Authentication**
  - Secure signup and login
  - JWT token-based authentication
  - User-specific data isolation

- 💰 **Expense Management**
  - Add, edit, and delete expenses
  - Categorize expenses (Food & Dining, Transportation, Shopping, etc.)
  - Track vendor information
  - Date-based expense tracking

- 📊 **Analytics & Reports**
  - Dashboard with key spending metrics
  - Category-based spending analysis
  - Vendor tracking and analysis
  - Monthly spending trends
  - Visual charts and graphs
  - Period-based reports

- 🎨 **User Interface**
  - Modern, clean design
  - Responsive layout
  - Intuitive navigation
  - Real-time updates

---





## 🎥 Demo

### Live Application

- **Frontend**: https://xtrackerapp.netlify.app
- **Backend API**: https://xtracker-app.onrender.com
- **Health Check**: https://xtracker-app.onrender.com/health


## 🛠 Technology Stack

### Frontend
- **React 18.3** - UI library
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Lucide React** - Icons
- **Vitest** - Testing framework

### Backend
- **Node.js 18+** - Runtime
- **Express.js 4.18** - Web framework
- **MongoDB** - Database
- **Mongoose 8.0** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Jest** - Testing framework

### Infrastructure
- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **GitHub Actions** - CI/CD
- **Sentry** - Error tracking

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-final-project-Mogul28.git
   cd mern-final-project-Mogul28/xtracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create `.env` file in backend directory**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_strong_random_secret_key
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   PORT=3000
   SENTRY_DSN=your_sentry_dsn_optional
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Create `.env` file in frontend directory**
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_SENTRY_DSN=your_sentry_dsn_optional
   ```

### Running Locally

1. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm start
   ```
   Backend runs on `http://localhost:3000`

2. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Verify Setup**
   - Backend health check: `http://localhost:3000/health`
   - Frontend: `http://localhost:5173`

### Development Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with watch mode
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run seed` - Seed database with sample data

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

---

## 📁 Project Structure

```
xtracker/
├── backend/                 # Backend API
│   ├── config/             # Configuration
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   ├── __tests__/          # Test files
│   └── server.js           # Entry point
│
├── frontend/               # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── __tests__/          # Test files
│
├── docs/                   # Documentation
│   ├── API.md             # API documentation
│   ├── USER_GUIDE.md      # User guide
│   ├── ARCHITECTURE.md    # Technical architecture
│   └── PRESENTATION.md    # Presentation guide
│
└── .github/
    └── workflows/         # CI/CD pipelines
```

---

## 📚 API Documentation

Comprehensive API documentation is available in the [API Documentation](xtracker/docs/API.md) file.

### Quick Reference

**Base URL**: `https://xtracker-app.onrender.com`

**Endpoints:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/expenses` - Get all expenses (protected)
- `POST /api/expenses` - Create expense (protected)
- `PUT /api/expenses/:id` - Update expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)
- `GET /api/categories` - Get expense categories

For detailed API documentation, see [docs/API.md](xtracker/docs/API.md)

---

## 🚢 Deployment

### Production Deployment

The application is deployed to production:

- **Frontend**: Netlify - https://xtrackerapp.netlify.app
- **Backend**: Render - https://xtracker-app.onrender.com
- **Database**: MongoDB Atlas

### Deployment Guide

Detailed deployment instructions are available in [DEPLOYMENT.md](xtracker/DEPLOYMENT.md)

### Environment Variables

**Backend (Render):**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - `production`
- `SENTRY_DSN` - Sentry DSN (optional)

**Frontend (Netlify):**
- `VITE_API_URL` - Backend API URL
- `VITE_SENTRY_DSN` - Sentry DSN (optional)

---

## 🧪 Testing

### Test Coverage

- **Backend**: 70%+ coverage target
- **Frontend**: 70%+ coverage target

### Running Tests

**Backend:**
```bash
cd backend
npm test
npm run test:coverage
```

**Frontend:**
```bash
cd frontend
npm test
npm run test:coverage
```

### Test Files

- Backend tests: `backend/__tests__/`
- Frontend tests: `frontend/src/__tests__/`

---

## 🔄 CI/CD

### GitHub Actions Workflows

The project includes automated CI/CD pipelines:

- **Backend CI/CD** (`.github/workflows/backend-ci.yml`)
  - Runs tests on push/PR
  - Deploys to Render on main branch

- **Frontend CI/CD** (`.github/workflows/frontend-ci.yml`)
  - Runs tests and linting
  - Builds production bundle
  - Deploys to Netlify on main branch

### Workflow Features

- Automated testing
- Code linting
- Coverage reports
- Automatic deployment
- Environment variable management

---

## 📊 Monitoring

### Error Tracking

The application uses **Sentry** for error tracking and monitoring:

- Real-time error tracking
- Performance monitoring
- User session replay
- Error alerts

### Health Checks

- Backend health endpoint: `/health`
- Database connection status
- Uptime monitoring ready

---

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[API Documentation](xtracker/docs/API.md)** - Complete API reference
- **[User Guide](xtracker/docs/USER_GUIDE.md)** - End-user documentation
- **[Technical Architecture](xtracker/docs/ARCHITECTURE.md)** - System architecture and design
- **[Presentation Guide](xtracker/docs/PRESENTATION.md)** - Project presentation template

### Additional Resources

- [Backend README](xtracker/backend/README.md)
- [Frontend README](xtracker/frontend/README.md)
- [Deployment Guide](xtracker/DEPLOYMENT.md)

---  


## pitvh deck
      link to pitch deck presentation: https://gamma.app/docs/xtracker-12uish5pmmveg3f

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [Mogul28](https://github.com/Mogul28)
- Email: mbusiro200@gmail.com
- LinkedIn:[Bramwel Mwita] https://www.linkedin.com/in/bramwel-mwita

---

## 🙏 Acknowledgments

- Course instructors and mentors
- Open-source community
- MongoDB, Express, React, and Node.js communities
- Documentation contributors

---

## 📞 Support

For support, please:

1. Check the [documentation](xtracker/docs/)
2. Review [existing issues](https://github.com/yourusername/mern-final-project-Mogul28/issues)
3. Create a new issue if needed

---

## 🗺 Roadmap

### Planned Features

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Export to CSV/Excel
- [ ] Budget tracking
- [ ] Recurring expenses
- [ ] Receipt photo upload
- [ ] Multi-currency support
- [ ] Mobile app

See [ARCHITECTURE.md](xtracker/docs/ARCHITECTURE.md) for more details.

---

<div align="center">



</div>
