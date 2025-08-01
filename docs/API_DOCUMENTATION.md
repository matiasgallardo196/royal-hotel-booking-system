# 📚 API Documentation - Royal Hotel Booking System

Complete API reference for the Royal Hotel Booking System backend.

## 📋 Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Error Codes](#error-codes)
- [Email Notifications](#email-notifications)
- [Validations](#validations)
- [Middlewares](#middlewares)
- [Appointment Statuses](#appointment-statuses)
- [Transactions](#transactions)

## 📖 Overview

The Royal Hotel Booking System API is a RESTful service built with Node.js, Express, and TypeScript. It provides endpoints for user management, appointment scheduling, and authentication.

### Key Features

- **RESTful Design**: Standard HTTP methods and status codes
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Standardized error responses
- **Email Notifications**: Automatic email confirmations
- **Database Transactions**: ACID compliance for data integrity

## 🌐 Base URL

### Development

```
http://localhost:3001
```

### Production

```
https://royal-hotel-booking-api.onrender.com
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Structure

```json
{
  "userId": "user-id",
  "username": "username",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## 📡 Endpoints

### Users

#### Register User

```http
POST /users/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "birthdate": "1990-01-01",
  "nDni": "12345678",
  "username": "johndoe",
  "password": "password123",
  "file": "base64-image-data"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "birthdate": "1990-01-01",
    "nDni": "12345678",
    "file": "https://cloudinary.com/image-url"
  }
}
```

#### Login User

```http
POST /users/login
```

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "birthdate": "1990-01-01",
      "nDni": "12345678",
      "file": "https://cloudinary.com/image-url"
    }
  }
}
```

#### Get All Users

```http
GET /users
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "birthdate": "1990-01-01",
      "nDni": "12345678",
      "file": "https://cloudinary.com/image-url"
    }
  ]
}
```

#### Get User by ID

```http
GET /users/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "birthdate": "1990-01-01",
    "nDni": "12345678",
    "file": "https://cloudinary.com/image-url"
  }
}
```

### Appointments

#### Get All Appointments

```http
GET /appointments
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "appointment-id",
      "date": "2024-01-15",
      "time": "14:00",
      "status": "active",
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

#### Get Appointment by ID

```http
GET /appointments/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "appointment-id",
    "date": "2024-01-15",
    "time": "14:00",
    "status": "active",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### Create Appointment

```http
POST /appointments/schedule
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "date": "2024-01-15",
  "time": "14:00"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Appointment created successfully",
  "data": {
    "id": "appointment-id",
    "date": "2024-01-15",
    "time": "14:00",
    "status": "active",
    "userId": "user-id"
  }
}
```

#### Cancel Appointment

```http
PUT /appointments/cancel/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "data": {
    "id": "appointment-id",
    "date": "2024-01-15",
    "time": "14:00",
    "status": "cancelled",
    "userId": "user-id"
  }
}
```

## 📝 Request/Response Examples

### Successful Registration

```bash
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "birthdate": "1990-01-01",
    "nDni": "12345678",
    "username": "johndoe",
    "password": "password123",
    "file": "base64-image-data"
  }'
```

### Successful Login

```bash
curl -X POST http://localhost:3001/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Create Appointment (with authentication)

```bash
curl -X POST http://localhost:3001/appointments/schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "date": "2024-01-15",
    "time": "14:00"
  }'
```

## ❌ Error Codes

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid token or token expired"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "User not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 📧 Email Notifications

The system automatically sends emails for the following events:

### Registration Confirmation

- **Trigger**: User registration
- **Content**: Welcome message with user details
- **Service**: SendGrid

### Appointment Confirmation

- **Trigger**: Appointment creation
- **Content**: Booking details and confirmation
- **Service**: SendGrid

### Cancellation Confirmation

- **Trigger**: Appointment cancellation
- **Content**: Cancellation confirmation
- **Service**: SendGrid

## ✅ Validations

### User Registration

- **name**: Required, string, 2-50 characters
- **email**: Required, valid email format, unique
- **birthdate**: Required, valid date format
- **nDni**: Required, string, 7-8 characters
- **username**: Required, string, 3-20 characters, unique
- **password**: Required, string, minimum 6 characters
- **file**: Optional, base64 image data

### User Login

- **username**: Required, string
- **password**: Required, string

### Appointment Creation

- **date**: Required, valid date format, future date
- **time**: Required, valid time format (HH:MM)
- **Business Rules**: No overlapping appointments for same user

## 🔧 Middlewares

### Authentication Middleware

```typescript
// Verifies JWT token and adds user to request
app.use("/appointments", authMiddleware);
```

### Validation Middleware

```typescript
// Validates request body against DTOs
app.use("/users/register", validateUserDto);
app.use("/appointments/schedule", validateAppointmentDto);
```

### Error Handling Middleware

```typescript
// Global error handler
app.use(errorHandler);
```

## 📊 Appointment Statuses

- **active**: Active and confirmed appointment
- **cancelled**: Appointment cancelled by user

## 🔄 Transactions

The API uses database transactions to ensure data consistency:

### User Registration Transaction

1. Create user record
2. Create credential record
3. Send welcome email
4. Commit transaction

### Appointment Creation Transaction

1. Validate appointment availability
2. Create appointment record
3. Send confirmation email
4. Commit transaction

### Appointment Cancellation Transaction

1. Validate cancellation time (24 hours before)
2. Update appointment status
3. Send cancellation email
4. Commit transaction

## 🔒 Security Features

### Password Security

- Passwords are hashed using bcryptjs
- Salt rounds: 10
- Never stored in plain text

### JWT Security

- Secret key stored in environment variables
- Token expiration: 24 hours
- Refresh token mechanism available

### Input Validation

- Server-side validation using class-validator
- SQL injection prevention
- XSS protection

### CORS Configuration

```typescript
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

## 📊 Rate Limiting

The API implements rate limiting to prevent abuse:

- **Requests per minute**: 100
- **Burst requests**: 20
- **Window size**: 1 minute

## 🔍 Logging

The API logs the following events:

- Request/response details
- Authentication attempts
- Database operations
- Error occurrences
- Email notifications

## 🧪 Testing

### API Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- --grep "User API"

# Run with coverage
npm run test:coverage
```

### Test Endpoints

- **Health Check**: `GET /health`
- **API Status**: `GET /api/status`

## 📚 Additional Resources

- [Backend Guide](BACKEND_GUIDE.md) - Backend architecture and setup
- [Database Schema](DATABASE_SCHEMA.md) - Database design and relationships
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Production deployment instructions

---

For technical support or questions, please refer to the [Backend Guide](BACKEND_GUIDE.md) or create an issue in the repository.
