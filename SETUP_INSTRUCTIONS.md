# 🚀 Instrucciones de Configuración - Royal Hotel Booking System

## 📋 Pasos para Configurar el Proyecto

### 1. Configuración de Base de Datos

1. **Instalar PostgreSQL** (versión 12 o superior)
2. **Crear la base de datos**:
   ```sql
   CREATE DATABASE royal_hotel_db;
   ```

### 2. Configuración del Backend

1. **Navegar al directorio del backend**:

   ```bash
   cd back
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   ```bash
   cp env.example .env
   ```

4. **Editar el archivo `.env`** con tus credenciales:

   ```env
   # Database Configuration
   PORT=3001
   HOST=localhost
   PORTDB=5432
   USERNAMEDB=tu_usuario_postgres
   PASSDB=tu_password_postgres
   DB=royal_hotel_db

   # Security
   SALT_ROUNDS=10
   JWT_SECRET=tu_clave_secreta_jwt_aqui

   # Environment
   ENVIRONMENT=development

   # Email Configuration (SendGrid)
   SENDGRID_API_KEY=tu_api_key_sendgrid
   EMAIL_FROM=noreply@royalhotel.com

   # CORS
   FRONTEND_URL=http://localhost:5173
   ```

5. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run start
   ```

### 3. Configuración del Frontend

1. **Navegar al directorio del frontend**:

   ```bash
   cd front
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   ```bash
   cp env.example .env
   ```

4. **Editar el archivo `.env`**:

   ```env
   # API Configuration
   VITE_URL_AXIOS=http://localhost:3001

   # Cloudinary Configuration (opcional para subida de imágenes)
   VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
   ```

5. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

### 4. Verificación de la Instalación

1. **Backend**: Debería estar corriendo en http://localhost:3001
2. **Frontend**: Debería estar corriendo en http://localhost:5173
3. **Base de datos**: Verificar conexión en la consola del backend

## 🔧 Servicios Opcionales

### SendGrid (para emails)

1. Crear cuenta en [SendGrid](https://sendgrid.com/)
2. Generar API Key
3. Configurar en el archivo `.env` del backend

### Cloudinary (para imágenes)

1. Crear cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtener Cloud Name y Upload Preset
3. Configurar en el archivo `.env` del frontend

## ❌ Problemas Comunes

### Error de conexión a la base de datos

- Verificar que PostgreSQL esté corriendo
- Verificar credenciales en el archivo `.env`
- Verificar que la base de datos `royal_hotel_db` exista

### Error de puerto ocupado

- Verificar que los puertos 3001 y 5173 estén libres
- Cambiar puertos en los archivos `.env` si es necesario

### Error de dependencias

- Eliminar `node_modules` y `package-lock.json`
- Ejecutar `npm install` nuevamente

## 📞 Soporte

Si encuentras problemas durante la configuración:

1. Revisar la documentación en la carpeta `docs/`
2. Verificar que todas las dependencias estén instaladas
3. Verificar la configuración de las variables de entorno
