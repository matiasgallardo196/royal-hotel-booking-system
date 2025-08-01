# 🚀 Setup Instructions - Royal Hotel Booking System

## 📋 Project Setup Steps

### 1. Database Configuration

1. **Install PostgreSQL** (version 12 or higher)
2. **Create the database**:
   ```sql
   CREATE DATABASE royal_hotel_db;
   ```

### 2. Backend Configuration

1. **Navigate to the backend directory**:

   ```bash
   cd back
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   ```bash
   cp env.example .env
   ```

4. **Edit the `.env` file** with your credentials:

   ```env
   # Database Configuration
   PORT=3001
   HOST=localhost
   PORTDB=5432
   USERNAMEDB=your_postgres_user
   PASSDB=your_postgres_password
   DB=royal_hotel_db

   # Security
   SALT_ROUNDS=10
   JWT_SECRET=your_jwt_secret_key_here

   # Environment
   ENVIRONMENT=development

   # Email Configuration (SendGrid)
   SENDGRID_API_KEY=your_sendgrid_api_key
   EMAIL_FROM=noreply@royalhotel.com

   # CORS
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the development server**:
   ```bash
   npm run start
   ```

### 3. Frontend Configuration

1. **Navigate to the frontend directory**:

   ```bash
   cd front
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   ```bash
   cp env.example .env
   ```

4. **Edit the `.env` file**:

   ```env
   # API Configuration
   VITE_URL_AXIOS=http://localhost:3001

   # Cloudinary Configuration (optional for image uploads)
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

### 4. Installation Verification

1. **Backend**: Should be running on http://localhost:3001
2. **Frontend**: Should be running on http://localhost:5173
3. **Database**: Verify connection in the backend console

## 🔧 Optional Services

### SendGrid (for emails)

1. Create account at [SendGrid](https://sendgrid.com/)
2. Generate API Key
3. Configure in the backend `.env` file

### Cloudinary (for images)

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get Cloud Name and Upload Preset
3. Configure in the frontend `.env` file

## ❌ Common Issues

### Database connection error

- Verify that PostgreSQL is running
- Verify credentials in the `.env` file
- Verify that the `royal_hotel_db` database exists

### Port already in use error

- Verify that ports 3001 and 5173 are free
- Change ports in the `.env` files if necessary

### Dependencies error

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📞 Support

If you encounter problems during setup:

1. Review the documentation in the `docs/` folder
2. Verify that all dependencies are installed
3. Verify the environment variables configuration
