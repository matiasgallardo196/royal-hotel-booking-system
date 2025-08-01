const validateLogin = (input) => {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};

  if (!input.username || !mailRegex.test(input.username)) {
    errors.username = "Invalid email address";
  }

  if (!input.password || input.password.trim() === "") {
    errors.password = "Password is required";
  }

  return errors;
};

export default validateLogin;
