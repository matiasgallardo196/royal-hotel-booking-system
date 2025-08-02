const validateRegister = (values) => {
  const error = {};

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]+$/;
  const dniRegex = /^\d{7,8}$/;

  if (!values.name.trim()) {
    error.name = "Name is required";
  } else {
    if (!nameRegex.test(values.name))
      error.name = "Name can only contain letters and spaces (2-50 characters)";
  }

  if (!values.email.trim()) {
    error.email = "Email is required";
  } else {
    if (!emailRegex.test(values.email)) error.email = "Invalid email format";
  }

  if (!values.birthdate) {
    error.birthdate = "Birth date is required";
  } else {
    const birthdate = new Date(values.birthdate);
    const today = new Date();
    if (birthdate >= today) {
      error.birthdate = "Must be a date before today";
    }
  }

  if (!values.nDni > 0) {
    error.nDni = "ID number is required";
  } else {
    if (!dniRegex.test(values.nDni))
      error.nDni = "ID number must have between 7 and 8 digits";
  }

  if (!values.password.trim()) {
    error.password = "Password is required";
  } else {
    if (!values.password) error.password = "Password cannot be empty.";
  }

  return error;
};

export default validateRegister;
