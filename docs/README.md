# 📚 Royal Hotel Booking System - Documentation

Complete documentation for the Royal Hotel Booking System, a full-stack web application for hotel appointment management.

## 📋 Table of Contents

- [Overview](#overview)
- [Documentation Index](#documentation-index)
- [Technologies Used](#technologies-used)
- [Quick Start Guide](#quick-start-guide)
- [Project Structure](#project-structure)
- [Main Functionalities](#main-functionalities)
- [Scripts](#scripts)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## 📖 Overview

The Royal Hotel Booking System is a comprehensive web application that allows users to book hotel appointments through an intuitive and modern interface. The system includes user authentication, appointment management, and real-time notifications.

### Key Features

- 🔐 **User Authentication**: Secure registration and login with JWT
- 📅 **Appointment Management**: Create, view, and cancel appointments
- 📧 **Email Notifications**: Automatic email confirmations
- 🖼️ **Image Upload**: Profile picture upload with Cloudinary
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Security**: Password hashing, JWT tokens, and input validation

## 📚 Documentation Index

### Core Documentation

- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference with endpoints, request/response examples, and error codes
- **[Backend Guide](BACKEND_GUIDE.md)** - Backend architecture, setup, and development guide
- **[Frontend Guide](FRONTEND_GUIDE.md)** - Frontend development, components, and styling guide
- **[Database Schema](DATABASE_SCHEMA.md)** - Database design, relationships, and queries

### Quick References

- **API Endpoints**: See [API Documentation](API_DOCUMENTATION.md#endpoints)
- **Database Schema**: See [Database Schema](DATABASE_SCHEMA.md#entities)
- **Environment Variables**: See [Backend Guide](BACKEND_GUIDE.md#environment-variables)
- **Component Structure**: See [Frontend Guide](FRONTEND_GUIDE.md#components)

## 🛠️ Technologies Used

### Backend Stack

- **Node.js** - JavaScript runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web application framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **SendGrid** - Email service
- **CORS** - Cross-origin resource sharing

### Frontend Stack

- **React 19** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Formik** - Form handling and validation
- **SweetAlert2** - Alert notifications
- **CSS Modules** - Styled components
- **Cloudinary** - Image storage and management

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-restart
- **Git** - Version control

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- Git
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd royal-hotel-booking-system
```

### 2. Configure environment variables

Copy the example environment files and configure them:

```bash
# Backend
cd back
cp env.example .env
# Edit .env with your database and API keys

# Frontend
cd ../front
cp env.example .env
# Edit .env with your backend API URL
```

### 3. Set up the database

```bash
# Install PostgreSQL and create database
createdb royal_hotel_db

# Run migrations
cd back
npm run typeorm migration:run
```

### 4. Start development servers

```bash
# Backend
cd back
npm install
npm run dev

# Frontend (in a new terminal)
cd front
npm install
npm run dev
```

### 5. Access the application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Project Structure

```
royal-hotel-booking-system/
├── back/                    # Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── data-source.ts  # Database configuration
│   │   │   └── envs.ts         # Environment variables
│   │   ├── controllers/    # Request handlers
│   │   │   ├── userController.ts
│   │   │   └── appointmentsController.ts
│   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── userDto.ts
│   │   │   ├── credentialDto.ts
│   │   │   └── appointmentDto.ts
│   │   ├── entities/      # Database models
│   │   │   ├── User.ts
│   │   │   ├── Credential.ts
│   │   │   └── Appointment.ts
│   │   ├── interfaces/    # TypeScript interfaces
│   │   │   ├── IUser.ts
│   │   │   ├── ICredential.ts
│   │   │   └── IAppointment.ts
│   │   ├── middlewares/   # Express middlewares
│   │   │   ├── auth.ts
│   │   │   ├── validateUserDto.ts
│   │   │   └── validateDtoId.ts
│   │   ├── repositories/  # Data access layer
│   │   │   ├── userRepository.ts
│   │   │   ├── credentialRepository.ts
│   │   │   └── appointmentRepository.ts
│   │   ├── routes/        # API routes
│   │   │   ├── userRouter.ts
│   │   │   ├── appointmentsRouter.ts
│   │   │   └── indexRouter.ts
│   │   ├── services/      # Business logic
│   │   │   ├── usersService.ts
│   │   │   ├── credentialService.ts
│   │   │   └── AppointmentService.ts
│   │   ├── utils/         # Utility functions
│   │   │   ├── authUtils.ts
│   │   │   ├── hashUtils.ts
│   │   │   ├── mailSender.ts
│   │   │   └── catchAsync.ts
│   │   ├── server.ts      # Server configuration
│   │   └── index.ts       # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── front/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── NavBar/
│   │   │   ├── Input/
│   │   │   ├── Turno/
│   │   │   ├── RegisterButton/
│   │   │   └── ConfirmModal/
│   │   ├── config/        # Configuration
│   │   │   └── envs.js
│   │   ├── context/       # React Context
│   │   │   └── UserContext.jsx
│   │   ├── helpers/       # Helper functions
│   │   │   ├── alerts.js
│   │   │   ├── validateLogin.js
│   │   │   ├── validateRegister.js
│   │   │   ├── validateNuevoTurno.js
│   │   │   ├── myAppointments.js
│   │   │   └── validarTiempoCancelacion.js
│   │   ├── views/         # Page components
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── MisTurnos/
│   │   │   ├── NuevoTurno/
│   │   │   ├── Contacto/
│   │   │   └── AboutProject/
│   │   ├── assets/        # Static assets
│   │   │   ├── img/
│   │   │   └── styles/
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Application entry point
│   │   ├── index.css      # Global styles
│   │   └── App.css        # App-specific styles
│   ├── public/            # Public assets
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
└── docs/                   # Project documentation
    ├── README.md
    ├── API_DOCUMENTATION.md
    ├── BACKEND_GUIDE.md
    ├── FRONTEND_GUIDE.md
    └── DATABASE_SCHEMA.md
```

## 📊 Main Functionalities

### User Management

- **Registration**: User registration with profile picture upload
- **Authentication**: Secure login with JWT tokens
- **Profile Management**: Update user information and profile picture
- **Password Security**: Encrypted passwords with bcryptjs

### Appointment System

- **Create Appointments**: Schedule new hotel appointments
- **View Appointments**: See personal appointment history
- **Cancel Appointments**: Cancel appointments with time restrictions
- **Status Management**: Track appointment status (active/cancelled)

### Email Notifications

- **Registration Confirmation**: Welcome email for new users
- **Appointment Confirmation**: Booking confirmation emails
- **Cancellation Notifications**: Appointment cancellation confirmations

### Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Encrypted password storage
- **Input Validation**: Server-side and client-side validation
- **CORS Protection**: Cross-origin request handling
- **Error Handling**: Comprehensive error management

## 📝 Scripts

### Backend Scripts

```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run typeorm      # TypeORM CLI commands
npm run migration    # Run database migrations
npm test             # Run tests
```

### Frontend Scripts

```bash
npm run dev          # Start development server with Vite
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
```

## 🆘 Support

### Getting Help

1. **Check the Documentation**: Start with the relevant guide in this documentation
2. **Search Issues**: Look for similar problems in the GitHub issues
3. **Create an Issue**: If you can't find a solution, create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Error messages
   - Environment information

### Common Issues

- **Database Connection**: Ensure PostgreSQL is running and credentials are correct
- **Environment Variables**: Verify all required variables are set in `.env` files
- **Port Conflicts**: Check if ports 3001 (backend) and 5173 (frontend) are available
- **Dependencies**: Run `npm install` in both `back/` and `front/` directories

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Implement your feature or fix
4. **Test Your Changes**: Ensure everything works correctly
5. **Commit Your Changes**: `git commit -m 'Add amazing feature'`
6. **Push to Branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Create a PR with detailed description

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation when necessary
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 👨‍💻 Author

**Matías Gallardo**

- GitHub: [@matiasgallardo196](https://github.com/matiasgallardo196)
- LinkedIn: [Matías Gallardo](https://www.linkedin.com/in/matias-gallardo-196/)

---

⭐ If you find this documentation helpful, please give the project a star!
