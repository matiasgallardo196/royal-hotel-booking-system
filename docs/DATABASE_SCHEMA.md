# 🗄️ Database Schema - Royal Hotel Booking System

Complete database schema documentation for the Royal Hotel Booking System.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Technology](#database-technology)
- [Entities](#entities)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Constraints](#constraints)
- [Frequent Queries](#frequent-queries)
- [Maintenance](#maintenance)
- [Backup and Restore](#backup-and-restore)

## 📖 Overview

The Royal Hotel Booking System uses PostgreSQL as its primary database. The schema is designed with three main entities: Users, Credentials, and Appointments, following a normalized structure for optimal performance and data integrity.

### Key Features

- **Normalized Design**: Efficient data storage and retrieval
- **Referential Integrity**: Foreign key constraints
- **Indexing Strategy**: Optimized for common queries
- **Transaction Support**: ACID compliance
- **Data Validation**: Constraints and triggers

## 🗄️ Database Technology

### PostgreSQL Configuration

- **Version**: 12 or higher
- **Encoding**: UTF-8
- **Collation**: en_US.UTF-8
- **Timezone**: UTC

### Connection Parameters

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=royal_hotel_db
```

## 📊 Entities

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthdate DATE NOT NULL,
    nDni VARCHAR(20) NOT NULL,
    file TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields Description:**

- `id`: Primary key, auto-incrementing
- `name`: User's full name (required)
- `email`: Unique email address (required)
- `birthdate`: Date of birth (required)
- `nDni`: National ID number as string (required)
- `file`: Profile picture URL (optional)
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

### Credentials Table

```sql
CREATE TABLE credentials (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_id INTEGER UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Fields Description:**

- `id`: Primary key, auto-incrementing
- `username`: Unique username for login (required)
- `password`: Hashed password (required)
- `user_id`: Foreign key to users table (required)
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

### Appointments Table

```sql
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status appointment_status_enum DEFAULT 'active',
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Fields Description:**

- `id`: Primary key, auto-incrementing
- `date`: Appointment date (required)
- `time`: Appointment time (required)
- `status`: Appointment status enum (default: active)
- `user_id`: Foreign key to users table (required)
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

## 📊 Enum: appointment_status_enum

```sql
CREATE TYPE appointment_status_enum AS ENUM ('active', 'cancelled');
```

**Values:**

- `active`: Appointment is confirmed and active
- `cancelled`: Appointment has been cancelled by the user

## 🔗 Relationships

### One-to-One Relationship

- **Users ↔ Credentials**: Each user has exactly one credential record
- **Relationship Type**: One-to-One
- **Foreign Key**: `credentials.user_id` references `users.id`
- **Cascade**: Delete credential when user is deleted

### One-to-Many Relationship

- **Users ↔ Appointments**: Each user can have multiple appointments
- **Relationship Type**: One-to-Many
- **Foreign Key**: `appointments.user_id` references `users.id`
- **Cascade**: Delete appointments when user is deleted

### Entity Relationship Diagram

```
Users (1) ←→ (1) Credentials
   ↓
   (1) ←→ (N) Appointments
```

## 📈 Indexes

### Primary Indexes

- `users.id` (PRIMARY KEY)
- `credentials.id` (PRIMARY KEY)
- `appointments.id` (PRIMARY KEY)

### Unique Indexes

- `users.email` (UNIQUE)
- `credentials.username` (UNIQUE)
- `credentials.user_id` (UNIQUE)

### Performance Indexes

```sql
-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Credentials table indexes
CREATE INDEX idx_credentials_username ON credentials(username);
CREATE INDEX idx_credentials_user_id ON credentials(user_id);

-- Appointments table indexes
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date_time ON appointments(date, time);
CREATE INDEX idx_appointments_created_at ON appointments(created_at);
```

## 🔒 Constraints

### Not Null Constraints

- All required fields have NOT NULL constraints
- Ensures data integrity and prevents null values

### Unique Constraints

- `users.email`: Prevents duplicate email addresses
- `credentials.username`: Prevents duplicate usernames
- `credentials.user_id`: Ensures one credential per user

### Foreign Key Constraints

- `credentials.user_id` → `users.id`
- `appointments.user_id` → `users.id`
- Cascade delete for data consistency

### Check Constraints

```sql
-- Validate email format
ALTER TABLE users ADD CONSTRAINT chk_email_format
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Validate date is not in the past for appointments
ALTER TABLE appointments ADD CONSTRAINT chk_appointment_date
CHECK (date >= CURRENT_DATE);

-- Validate time format
ALTER TABLE appointments ADD CONSTRAINT chk_appointment_time
CHECK (time >= '00:00' AND time <= '23:59');
```

## 🔍 Frequent Queries

### Get User with Credentials

```sql
SELECT u.*, c.username
FROM users u
JOIN credentials c ON u.id = c.user_id
WHERE u.id = $1;
```

### Get User Appointments

```sql
SELECT a.*, u.name, u.email
FROM appointments a
JOIN users u ON a.user_id = u.id
WHERE a.user_id = $1
ORDER BY a.date DESC, a.time DESC;
```

### Get Active Appointments

```sql
SELECT a.*, u.name, u.email
FROM appointments a
JOIN users u ON a.user_id = u.id
WHERE a.status = 'active';
```

### Get Appointments by Date

```sql
SELECT a.*, u.name, u.email
FROM appointments a
JOIN users u ON a.user_id = u.id
WHERE a.date = $1
ORDER BY a.time;
```

### Get Appointments Statistics

```sql
SELECT
    COUNT(*) as total_appointments,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_appointments,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_appointments
FROM appointments;
```

## 🛠️ Maintenance

### Regular Maintenance Tasks

#### 1. Clean Up Cancelled Appointments

```sql
-- Delete cancelled appointments older than 30 days
DELETE FROM appointments
WHERE status = 'cancelled'
AND date < CURRENT_DATE - INTERVAL '30 days';
```

#### 2. Update Statistics

```sql
-- Update appointment statistics
ANALYZE appointments;
ANALYZE users;
ANALYZE credentials;
```

#### 3. Vacuum Database

```sql
-- Clean up and optimize database
VACUUM ANALYZE;
```

### Performance Monitoring

#### Check Index Usage

```sql
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

#### Check Table Sizes

```sql
SELECT
    table_name,
    pg_size_pretty(pg_total_relation_size(table_name)) as size
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY pg_total_relation_size(table_name) DESC;
```

## 💾 Backup and Restore

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="royal_hotel_db"

# Create backup
pg_dump -h localhost -U username -d $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

### Restore Database

```bash
# Restore from backup
gunzip -c backup_20240115_143000.sql.gz | psql -h localhost -U username -d royal_hotel_db
```

### Backup Schedule

- **Daily**: Full database backup at 2:00 AM
- **Weekly**: Compressed backup retention for 4 weeks
- **Monthly**: Long-term backup retention for 12 months

## 🔧 Database Utilities

### Reset Database

```sql
-- Drop all tables and recreate
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### Migration Scripts

```bash
# Run TypeORM migrations
npm run typeorm migration:run

# Generate new migration
npm run typeorm migration:generate -- -n MigrationName

# Revert last migration
npm run typeorm migration:revert
```

## 📊 Data Integrity

### Triggers for Updated At

```sql
-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credentials_updated_at BEFORE UPDATE ON credentials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🔍 Monitoring Queries

### Active Connections

```sql
SELECT
    datname,
    usename,
    application_name,
    client_addr,
    state,
    query_start
FROM pg_stat_activity
WHERE datname = 'royal_hotel_db';
```

### Slow Queries

```sql
SELECT
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
WHERE query LIKE '%appointments%'
ORDER BY mean_time DESC
LIMIT 10;
```

---

For more information about database configuration and optimization, refer to the [Backend Guide](BACKEND_GUIDE.md) and [Deployment Guide](DEPLOYMENT_GUIDE.md).
