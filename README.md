# Royal Hotel - Appointment Booking System

A full-stack web application for hotel appointment management, built with React frontend and Node.js backend.

## What it does

- **User Registration & Login**: Secure authentication with JWT tokens
- **Appointment Booking**: Users can schedule appointments with 24-hour advance notice
- **Appointment Management**: View and cancel existing appointments
- **Email Notifications**: Automatic email confirmations for bookings and cancellations
- **Profile Management**: Upload profile pictures and manage user information

## Tech Stack

**Frontend:**

- React 19 with Vite
- React Router for navigation
- Axios for API calls
- SweetAlert2 for notifications
- CSS Modules for styling

**Backend:**

- Node.js with Express
- TypeScript
- TypeORM with PostgreSQL
- JWT for authentication
- SendGrid for email service
- bcryptjs for password hashing

## Key Features

### Business Rules

- Appointments must be booked at least 24 hours in advance
- Only weekdays (Monday-Friday) are available
- Business hours: 9:00 AM to 6:00 PM
- Cancellations require 24-hour notice

### User Experience

- Real-time form validation
- Intuitive navigation with user-friendly interface
- Profile picture upload via Cloudinary

## Project Structure

```
├── back/                 # Backend API
│   ├── src/
│   │   ├── controllers/  # API endpoints
│   │   ├── entities/     # Database models
│   │   ├── services/     # Business logic
│   │   ├── middlewares/  # Auth & validation
│   │   └── routes/       # API routes
│   └── package.json
├── front/               # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── views/       # Page components
│   │   ├── helpers/     # Validation & utilities
│   │   └── context/     # React context
│   └── package.json
```

## Quick Start

1. **Clone and install dependencies:**

   ```bash
   cd back && npm install
   cd ../front && npm install
   ```

2. **Set up environment variables:**

   - Backend: Database connection, JWT secret, SendGrid API
   - Frontend: API endpoint URL

3. **Run the application:**

   ```bash
   # Backend
   cd back && npm start

   # Frontend
   cd front && npm run dev
   ```

## API Endpoints

- `POST /users/register` - User registration
- `POST /users/login` - User authentication
- `GET /users/:id` - Get user profile
- `POST /appointments/schedule` - Create appointment
- `PUT /appointments/cancel/:id` - Cancel appointment
- `GET /appointments` - List appointments

## Developer

**Matías Gallardo**

- Location: Sydney, Australia
- LinkedIn: [Profile](https://www.linkedin.com/in/matiasgallardo-dev/)
- GitHub: [Profile](https://github.com/matiasgallardo196)
