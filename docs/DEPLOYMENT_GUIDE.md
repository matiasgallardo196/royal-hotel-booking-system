# 🚀 Deployment Guide - Royal Hotel Booking System

Complete guide for deploying the Royal Hotel Booking System to production environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Production Deployment](#production-deployment)
- [Security Configuration](#security-configuration)
- [Monitoring and Logging](#monitoring-and-logging)
- [CI/CD Pipeline](#cicd-pipeline)
- [Testing](#testing)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Software

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **Git** (for version control)
- **PM2** (for process management)
- **Nginx** (for reverse proxy)

### Required Accounts

- **GitHub** - Code repository
- **Heroku/Railway** - Cloud hosting (optional)
- **SendGrid** - Email service
- **Cloudinary** - Image storage

## 🏠 Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd royal-hotel-booking-system
```

### 2. Configure PostgreSQL Database

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE royal_hotel_db;
CREATE USER royal_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE royal_hotel_db TO royal_user;
\q
```

### 3. Configure Backend

```bash
cd back

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Environment Variables for Backend:**

```env
# Server Configuration
PORT=3001
HOST=localhost
NODE_ENV=development

# Database Configuration
PORTDB=5432
USERNAMEDB=royal_user
PASSDB=your_password
DB=royal_hotel_db

# Security
SALT_ROUNDS=10
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_email@domain.com
```

### 4. Configure SendGrid

1. Create account at [SendGrid](https://sendgrid.com/)
2. Generate API Key
3. Configure in environment variables

#### Configure Cloudinary

1. Create account in [Cloudinary](https://cloudinary.com/)
2. Get Cloud Name, API Key and API Secret
3. Configure in frontend for image uploads

**Note**: The project uses Cloudinary for storing user profile images. The configuration is located in the frontend in `src/views/Register/Register.jsx`.

### 5. Configure Frontend

```bash
cd front

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Environment Variables for Frontend:**

```env
# Backend API URL
VITE_API_URL=http://localhost:3001

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 6. Start Development Servers

```bash
# Backend (Terminal 1)
cd back
npm run dev

# Frontend (Terminal 2)
cd front
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 🌐 Production Deployment

### Option 1: Heroku Deployment

#### Deploy Backend

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create Heroku app
heroku create royal-hotel-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_jwt_secret
heroku config:set SENDGRID_API_KEY=your_sendgrid_api_key
heroku config:set EMAIL_FROM=your_email@domain.com

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Deploy Frontend

```bash
# Create Heroku app for frontend
heroku create royal-hotel-frontend

# Set buildpack for static sites
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git

# Set environment variables
heroku config:set VITE_API_URL=https://royal-hotel-backend.herokuapp.com

# Deploy
git add .
git commit -m "Deploy frontend to Heroku"
git push heroku main
```

### Option 2: Railway Deployment

#### Deploy Backend

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_production_jwt_secret
railway variables set SENDGRID_API_KEY=your_sendgrid_api_key
railway variables set EMAIL_FROM=your_email@domain.com

# Deploy
railway up
```

#### Deploy Frontend

```bash
# Create new service for frontend
railway service create frontend

# Set environment variables
railway variables set VITE_API_URL=https://your-backend-url.railway.app

# Deploy
railway up
```

### Option 3: VPS Deployment (Ubuntu)

#### Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

#### Configure PostgreSQL

```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE royal_hotel_db;
CREATE USER royal_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE royal_hotel_db TO royal_user;
\q
```

#### Deploy Backend

```bash
# Clone repository
git clone <repository-url>
cd royal-hotel-booking-system/back

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Production Environment Variables:**

```env
# Server Configuration
PORT=3001
HOST=localhost
NODE_ENV=production

# Database Configuration
PORTDB=5432
USERNAMEDB=royal_user
PASSDB=your_secure_password
DB=royal_hotel_db

# Security
SALT_ROUNDS=10
JWT_SECRET=your_super_secure_jwt_secret

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_email@domain.com
```

```bash
# Build application
npm run build

# Start with PM2
pm2 start dist/index.js --name "royal-hotel-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Deploy Frontend

```bash
# Navigate to frontend directory
cd ../front

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Frontend Environment Variables:**

```env
# Backend API URL
VITE_API_URL=https://your-domain.com/api

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

```bash
# Build for production
npm run build

# Copy build to Nginx directory
sudo cp -r dist/* /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

#### Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/royal-hotel
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/royal-hotel /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 🔒 Security Configuration

### SSL/HTTPS Setup

#### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

#### Using Cloudflare

1. Create account at [Cloudflare](https://cloudflare.com/)
2. Add your domain
3. Update nameservers
4. Enable SSL/TLS encryption mode to "Full"
5. Configure DNS records

### Environment Security

```bash
# Secure environment variables
sudo nano /etc/environment

# Add production variables
NODE_ENV=production
JWT_SECRET=your_super_secure_secret
DB_PASSWORD=your_secure_db_password
```

### Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3001
sudo ufw enable
```

## 📊 Monitoring and Logging

### PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs royal-hotel-backend

# Restart application
pm2 restart royal-hotel-backend

# Check status
pm2 status
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Monitoring

```bash
# Connect to PostgreSQL
sudo -u postgres psql royal_hotel_db

# Check active connections
SELECT * FROM pg_stat_activity;

# Check database size
SELECT pg_size_pretty(pg_database_size('royal_hotel_db'));
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: |
          cd back
          npm install

      - name: Run tests
        run: |
          cd back
          npm test

      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /path/to/royal-hotel-booking-system/back
            git pull origin main
            npm install
            npm run build
            pm2 restart royal-hotel-backend

  deploy-frontend:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: |
          cd front
          npm install

      - name: Build frontend
        run: |
          cd front
          npm run build

      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /path/to/royal-hotel-booking-system/front
            git pull origin main
            npm install
            npm run build
            sudo cp -r dist/* /var/www/html/
            sudo chown -R www-data:www-data /var/www/html/
```

## 🧪 Testing

### Backend Testing

```bash
# Run all tests
cd back
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- --grep "User API"
```

### Frontend Testing

```bash
# Run tests
cd front
npm test

# Run with coverage
npm run test:coverage
```

### Load Testing

```bash
# Install Artillery
npm install -g artillery

# Run load test
artillery run load-test.yml
```

**Load Test Configuration (`load-test.yml`):**

```yaml
config:
  target: "https://your-domain.com"
  phases:
    - duration: 60
      arrivalRate: 10
  defaults:
    headers:
      Content-Type: "application/json"

scenarios:
  - name: "API Load Test"
    requests:
      - get:
          url: "/api/users"
      - post:
          url: "/api/users/login"
          json:
            username: "testuser"
            password: "password123"
```

## ⚡ Performance Optimization

### Database Optimization

```sql
-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_date ON appointments(date);

-- Analyze tables
ANALYZE users;
ANALYZE appointments;
ANALYZE credentials;
```

### Nginx Optimization

```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Cache static files
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Node.js Optimization

```bash
# Set Node.js environment variables
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=2048"

# Use PM2 cluster mode
pm2 start dist/index.js --name "royal-hotel-backend" -i max
```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
sudo -u postgres psql -d royal_hotel_db

# Check logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

#### Application Not Starting

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs royal-hotel-backend

# Restart application
pm2 restart royal-hotel-backend
```

#### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check status
sudo systemctl status nginx

# Check logs
sudo tail -f /var/log/nginx/error.log
```

### Performance Issues

```bash
# Check system resources
htop

# Check disk usage
df -h

# Check memory usage
free -h

# Check network connections
netstat -tulpn
```

### Backup and Recovery

```bash
# Create database backup
pg_dump royal_hotel_db > backup_$(date +%Y%m%d).sql

# Restore database
psql royal_hotel_db < backup_20240115.sql

# Backup application files
tar -czf app_backup_$(date +%Y%m%d).tar.gz /path/to/application
```

---

For more information about the application architecture, refer to the [Backend Guide](BACKEND_GUIDE.md) and [Frontend Guide](FRONTEND_GUIDE.md).
