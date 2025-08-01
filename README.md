# 🏨 Royal Hotel Booking System

A comprehensive hotel booking system built with modern web technologies, featuring user authentication, appointment management, and real-time notifications.

## 🚀 Live Demo

- **Frontend**: [https://royal-hotel-booking.vercel.app](https://royal-hotel-booking.vercel.app)
- **Backend API**: [https://royal-hotel-booking-api.onrender.com](https://royal-hotel-booking-api.onrender.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 📖 Overview

Royal Hotel Booking System is a full-stack web application that allows users to book hotel appointments with a modern, responsive interface. The system includes user registration, authentication, appointment scheduling, and management features.

### Key Features

- 🔐 **User Authentication**: Secure login and registration with JWT
- 📅 **Appointment Management**: Create, view, and cancel appointments
- 📧 **Email Notifications**: Automatic email confirmations
- 🖼️ **Image Upload**: Profile picture upload with Cloudinary
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Security**: Password hashing, JWT tokens, and input validation

## ✨ Features

### User Features

- User registration with profile picture upload
- Secure login with JWT authentication
- View and manage personal appointments
- Cancel appointments (with time restrictions)
- Real-time form validation
- Responsive design for all devices

### Admin Features

- View all appointments in the system
- Manage user accounts
- Monitor booking statistics
- Email notification system

## 🛠️ Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **SendGrid** - Email service
- **CORS** - Cross-origin resource sharing

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Formik** - Form handling
- **SweetAlert2** - Alert notifications
- **CSS Modules** - Styled components
- **Cloudinary** - Image storage

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd royal-hotel-booking-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd back

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database and API keys

# Run database migrations
npm run typeorm migration:run

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd front

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your backend API URL

# Start development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Project Structure

```
royal-hotel-booking-system/
├── back/                    # Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # Database models
│   │   ├── interfaces/    # TypeScript interfaces
│   │   ├── middlewares/   # Express middlewares
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── front/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── config/        # Configuration
│   │   ├── context/       # React Context
│   │   ├── helpers/       # Helper functions
│   │   ├── views/         # Page components
│   │   └── assets/        # Static assets
│   ├── package.json
│   └── vite.config.js
└── docs/                   # Project documentation
    ├── API_DOCUMENTATION.md
    ├── BACKEND_GUIDE.md
    ├── DATABASE_SCHEMA.md
    ├── DEPLOYMENT_GUIDE.md
    ├── FRONTEND_GUIDE.md
    └── README.md
```

## 📚 Documentation

For detailed documentation, please refer to the following guides:

- **[API Documentation](docs/API_DOCUMENTATION.md)** - Complete API reference
- **[Backend Guide](docs/BACKEND_GUIDE.md)** - Backend architecture and setup
- **[Frontend Guide](docs/FRONTEND_GUIDE.md)** - Frontend development guide
- **[Database Schema](docs/DATABASE_SCHEMA.md)** - Database design and queries
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment instructions

## 🔧 Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=royal_hotel_db

# JWT
JWT_SECRET=your_jwt_secret

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_email@domain.com

# Server
PORT=3001
NODE_ENV=development
```

### Frontend (.env)

```env
# Backend API
VITE_API_URL=http://localhost:3001

# Cloudinary (for image uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 🚀 Deployment

The application is deployed on:

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: PostgreSQL (Render)

For detailed deployment instructions, see [Deployment Guide](docs/DEPLOYMENT_GUIDE.md).

## 🧪 Testing

```bash
# Backend tests
cd back
npm test

# Frontend tests
cd front
npm test
```

## 📊 Main Functionalities

### User Management

- User registration with email verification
- Secure login with JWT tokens
- Profile management with image upload
- Password reset functionality

### Appointment System

- Create new appointments
- View appointment history
- Cancel appointments (with time restrictions)
- Email notifications for bookings

### Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Rate limiting

## 📝 Scripts

### Backend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typeorm      # TypeORM CLI commands
npm run migration    # Run database migrations
```

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

## 👨‍💻 Author

**Matías Gallardo**

- GitHub: [@matiasgallardo196](https://github.com/matiasgallardo196)
- LinkedIn: [Matías Gallardo](https://www.linkedin.com/in/matias-gallardo-196/)

---

⭐ If you find this project helpful, please give it a star!
