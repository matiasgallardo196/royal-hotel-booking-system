# 🎨 Frontend Guide - Royal Hotel Booking System

Complete guide for the frontend development of the Royal Hotel Booking System.

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Main Components](#main-components)
- [Pages](#pages)
- [Styling](#styling)
- [Helper Functions](#helper-functions)
- [State Management](#state-management)
- [Security](#security)
- [Responsive Design](#responsive-design)
- [Scripts](#scripts)
- [Vite Configuration](#vite-configuration)
- [Dependencies](#dependencies)
- [Best Practices](#best-practices)

## 📖 Overview

The frontend of the Royal Hotel Booking System is built with React 19 and Vite, providing a modern, responsive user interface for hotel appointment management. The application features user authentication, appointment scheduling, and real-time form validation.

### Key Features

- **Modern React**: Built with React 19 and latest features
- **Fast Development**: Vite for rapid development and building
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Real-time client-side validation
- **State Management**: React Context for global state
- **Image Upload**: Cloudinary integration for profile pictures

## 🛠️ Technologies Used

### Core Technologies

- **React 19** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API communication

### UI and Styling

- **CSS Modules** - Scoped styling
- **SweetAlert2** - Alert notifications
- **Formik** - Form handling and validation

### External Services

- **Cloudinary** - Image storage and management

### Development Tools

- **ESLint** - Code linting
- **Git** - Version control

## 📁 Project Structure

```
front/
├── public/                 # Public assets
│   └── vite.svg
├── src/
│   ├── assets/            # Static assets
│   │   ├── img/          # Images
│   │   │   ├── fondo.webp
│   │   │   └── The-Royal-Logo.png
│   │   ├── react.svg
│   │   └── styles/       # Global styles
│   │       └── reset.css
│   ├── components/       # Reusable components
│   │   ├── ConfirmModal/
│   │   │   ├── ConfirmModal.jsx
│   │   │   └── ConfirmModal.module.css
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.module.css
│   │   ├── NavBar/
│   │   │   ├── LogoNavBar/
│   │   │   │   ├── LogoNavBar.jsx
│   │   │   │   └── LogoNavBar.module.css
│   │   │   ├── NavBar.jsx
│   │   │   ├── NavBar.module.css
│   │   │   └── NavButton/
│   │   │       ├── NavButton.jsx
│   │   │       └── NavButton.module.css
│   │   ├── RegisterButton/
│   │   │   ├── RegisterButton.jsx
│   │   │   └── RegisterButton.module.css
│   │   └── Turno/
│   │       ├── Turno.jsx
│   │       └── Turno.module.css
│   ├── config/           # Configuration
│   │   └── envs.js
│   ├── context/          # React Context
│   │   └── UserContext.jsx
│   ├── helpers/          # Helper functions
│   │   ├── alerts.js
│   │   ├── myAppointments.js
│   │   ├── validarTiempoCancelacion.js
│   │   ├── validateLogin.js
│   │   ├── validateNuevoTurno.js
│   │   └── validateRegister.js
│   ├── views/            # Page components
│   │   ├── AboutProject/
│   │   │   ├── AboutProject.jsx
│   │   │   └── AboutProject.module.css
│   │   ├── Contacto/
│   │   │   ├── Contacto.jsx
│   │   │   └── Contacto.module.css
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.module.css
│   │   ├── MisTurnos/
│   │   │   ├── MisTurnos.jsx
│   │   │   └── MisTurnos.module.css
│   │   ├── NuevoTurno/
│   │   │   ├── NuevoTurno.jsx
│   │   │   └── NuevoTurno.module.css
│   │   └── Register/
│   │       ├── Register.jsx
│   │       └── Register.module.css
│   ├── App.css           # App-specific styles
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── README.md             # Frontend documentation
└── vite.config.js        # Vite configuration
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `front/` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:3001

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Configuration File

```javascript
// src/config/envs.js
export const envs = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};
```

## 🧩 Main Components

### App.jsx

Main application component that handles routing and authentication:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import NuevoTurno from "./views/NuevoTurno/NuevoTurno";
import Contacto from "./views/Contacto/Contacto";
import AboutProject from "./views/AboutProject/AboutProject";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mis-turnos" element={<MisTurnos />} />
          <Route path="/nuevo-turno" element={<NuevoTurno />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/about" element={<AboutProject />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
```

### UserContext.jsx

Global state management for user authentication:

```jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { envs } from "../config/envs";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and set user
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${envs.API_URL}/users/login`,
        credentials
      );
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const registerUser = async (userData) => {
    try {
      // Upload image to Cloudinary if provided
      if (userData.file) {
        const imageUrl = await uploadImageToCloudinary(userData.file);
        userData.file = imageUrl;
      }

      const response = await axios.post(
        `${envs.API_URL}/users/register`,
        userData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    user,
    login,
    logout,
    registerUser,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
```

## 📄 Pages

### Home

Landing page with hotel information and call-to-action buttons:

```jsx
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Welcome to Royal Hotel</h1>
        <p>Experience luxury and comfort in every stay</p>
        {!user ? (
          <div className={styles.buttons}>
            <Link to="/login" className={styles.button}>
              Login
            </Link>
            <Link to="/register" className={styles.button}>
              Register
            </Link>
          </div>
        ) : (
          <div className={styles.buttons}>
            <Link to="/nuevo-turno" className={styles.button}>
              Book Appointment
            </Link>
            <Link to="/mis-turnos" className={styles.button}>
              My Appointments
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
```

### Login

User authentication page with form validation:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { validateLogin } from "../helpers/validateLogin";
import { showAlert } from "../helpers/alerts";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Attempt login
    const result = await login(formData);
    if (result.success) {
      showAlert("success", "Login successful!");
      navigate("/");
    } else {
      showAlert("error", result.error || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className={errors.username ? styles.error : ""}
        />
        {errors.username && (
          <span className={styles.errorText}>{errors.username}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={errors.password ? styles.error : ""}
        />
        {errors.password && (
          <span className={styles.errorText}>{errors.password}</span>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
```

### Register

User registration with image upload and Cloudinary integration:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { validateRegister } from "../helpers/validateRegister";
import { showAlert } from "../helpers/alerts";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const { registerUser } = useUser();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateRegister(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Attempt registration
    const result = await registerUser(formData);
    if (result.success) {
      showAlert("success", "Registration successful!");
      navigate("/login");
    } else {
      showAlert("error", result.error || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? styles.error : ""}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? styles.error : ""}
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}

        <input
          type="date"
          value={formData.birthdate}
          onChange={(e) =>
            setFormData({ ...formData, birthdate: e.target.value })
          }
          className={errors.birthdate ? styles.error : ""}
        />
        {errors.birthdate && (
          <span className={styles.errorText}>{errors.birthdate}</span>
        )}

        <input
          type="text"
          placeholder="DNI Number"
          value={formData.nDni}
          onChange={(e) => setFormData({ ...formData, nDni: e.target.value })}
          className={errors.nDni ? styles.error : ""}
        />
        {errors.nDni && <span className={styles.errorText}>{errors.nDni}</span>}

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className={errors.username ? styles.error : ""}
        />
        {errors.username && (
          <span className={styles.errorText}>{errors.username}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={errors.password ? styles.error : ""}
        />
        {errors.password && (
          <span className={styles.errorText}>{errors.password}</span>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.fileInput}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
```

### MisTurnos

User's appointment management page:

```jsx
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  getMyAppointments,
  cancelAppointment,
} from "../helpers/myAppointments";
import { showAlert } from "../helpers/alerts";
import Turno from "../components/Turno/Turno";
import styles from "./MisTurnos.module.css";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      showAlert("error", "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      showAlert("success", "Appointment cancelled successfully");
      loadAppointments(); // Reload appointments
    } catch (error) {
      showAlert("error", error.message || "Failed to cancel appointment");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className={styles.appointmentsList}>
          {appointments.map((appointment) => (
            <Turno
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

### NuevoTurno

Appointment booking page:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateNuevoTurno } from "../helpers/validateNuevoTurno";
import { createAppointment } from "../helpers/myAppointments";
import { showAlert } from "../helpers/alerts";
import styles from "./NuevoTurno.module.css";

const NuevoTurno = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateNuevoTurno(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create appointment
    try {
      await createAppointment(formData);
      showAlert("success", "Appointment created successfully!");
      navigate("/mis-turnos");
    } catch (error) {
      showAlert("error", error.message || "Failed to create appointment");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Book New Appointment</h2>

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className={errors.date ? styles.error : ""}
        />
        {errors.date && <span className={styles.errorText}>{errors.date}</span>}

        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className={errors.time ? styles.error : ""}
        />
        {errors.time && <span className={styles.errorText}>{errors.time}</span>}

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};
```

## 🎨 Styling

### CSS Modules

The project uses CSS Modules for scoped styling:

```css
/* Component.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.button:hover {
  background-color: #0056b3;
}

.error {
  border-color: #dc3545;
}

.errorText {
  color: #dc3545;
  font-size: 0.875rem;
}
```

### Global Styles

```css
/* src/index.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
```

## 🔧 Helper Functions

### Alerts

```javascript
// src/helpers/alerts.js
import Swal from "sweetalert2";

export const showAlert = (type, message) => {
  Swal.fire({
    icon: type,
    title: type === "success" ? "Success!" : "Error!",
    text: message,
    confirmButtonColor: type === "success" ? "#28a745" : "#dc3545",
  });
};

export const showConfirmDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!",
  });
};
```

### Validation Functions

```javascript
// src/helpers/validateLogin.js
export const validateLogin = (data) => {
  const errors = {};

  if (!data.username.trim()) {
    errors.username = "Username is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

// src/helpers/validateRegister.js
export const validateRegister = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.birthdate) {
    errors.birthdate = "Birthdate is required";
  }

  if (!data.nDni.trim()) {
    errors.nDni = "DNI is required";
  }

  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

// src/helpers/validateNuevoTurno.js
export const validateNuevoTurno = (data) => {
  const errors = {};

  if (!data.date) {
    errors.date = "Date is required";
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.date = "Date cannot be in the past";
    }
  }

  if (!data.time) {
    errors.time = "Time is required";
  }

  return errors;
};
```

### API Functions

```javascript
// src/helpers/myAppointments.js
import axios from "axios";
import { envs } from "../config/envs";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getMyAppointments = async () => {
  try {
    const response = await axios.get(`${envs.API_URL}/appointments`, {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch appointments"
    );
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(
      `${envs.API_URL}/appointments/schedule`,
      appointmentData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create appointment"
    );
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.put(
      `${envs.API_URL}/appointments/cancel/${appointmentId}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to cancel appointment"
    );
  }
};
```

### Cloudinary Integration

```javascript
// src/helpers/cloudinary.js
import axios from "axios";
import { envs } from "../config/envs";

export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", envs.CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${envs.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};
```

## 🔄 State Management

### User Context

The application uses React Context for global state management:

```jsx
// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { envs } from "../config/envs";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${envs.API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${envs.API_URL}/users/login`,
        credentials
      );
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
```

## 🔒 Security

### Authentication

- JWT tokens stored in localStorage
- Automatic token verification on app load
- Protected routes for authenticated users
- Secure logout functionality

### Input Validation

- Client-side validation for all forms
- Real-time validation feedback
- Server-side validation (backend handles this)
- XSS protection through proper input sanitization

### API Security

- HTTPS for all API calls
- Authorization headers for authenticated requests
- Error handling for failed requests
- Secure token management

## 📱 Responsive Design

### Mobile-First Approach

```css
/* Base styles for mobile */
.container {
  padding: 10px;
}

.form {
  width: 100%;
  max-width: 100%;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }

  .form {
    max-width: 400px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
  }
}
```

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## 📝 Scripts

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## ⚙️ Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

## 📦 Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.6.0",
    "sweetalert2": "^11.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "vite": "^4.4.0"
  }
}
```

## ✅ Best Practices

### Code Organization

- **Component Structure**: Each component in its own folder with JSX and CSS files
- **Helper Functions**: Reusable functions in separate files
- **Constants**: Environment variables and configuration in dedicated files
- **Naming Conventions**: Consistent naming for files and components

### Performance

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Use React.memo for expensive components
- **Bundle Optimization**: Vite for fast builds and development
- **Image Optimization**: Cloudinary for optimized image delivery

### Accessibility

- **Semantic HTML**: Proper use of HTML elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes

### Error Handling

- **Try-Catch Blocks**: Proper error handling in async operations
- **User Feedback**: Clear error messages and loading states
- **Fallback UI**: Graceful degradation for failed operations
- **Validation**: Comprehensive form validation

---

For more information about the backend integration, refer to the [API Documentation](API_DOCUMENTATION.md) and [Backend Guide](BACKEND_GUIDE.md).
