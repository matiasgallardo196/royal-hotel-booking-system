const validateRegister = (values) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dniRegex = /^\d{7,8}$/;

  const error = {};

  // Name validation
  if (!values.name || values.name.trim() === "") {
    error.name = "Name is required";
  } else if (!nameRegex.test(values.name)) {
    error.name = "Name can only contain letters and spaces (2-50 characters)";
  }

  // Email validation
  if (!values.email || values.email.trim() === "") {
    error.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    error.email = "Invalid email format";
  }

  // Birthdate validation
  if (!values.birthdate) {
    error.birthdate = "Birthdate is required";
  } else {
    const birthDate = new Date(values.birthdate);
    const today = new Date();
    if (birthDate >= today) {
      error.birthdate = "Birthdate must be before today";
    }
  }

  // DNI validation
  if (!values.nDni || values.nDni.trim() === "") {
    error.nDni = "DNI is required";
  } else if (!dniRegex.test(values.nDni)) {
    error.nDni = "DNI must have between 7 and 8 numbers";
  }

  // Password validation
  if (!values.password || values.password.trim() === "") {
    error.password = "Password is required";
  } else if (values.password.length < 6) {
    error.password = "Password must be at least 6 characters long";
  }

  return error;
};

export default validateRegister;
