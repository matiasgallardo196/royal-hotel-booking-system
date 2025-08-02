const validate = (input) => {
  const errors = {};
  const mailRegex = /^[^@]+@[^@]+\.[a-zA-Z]+$/;

  if (!mailRegex.test(input.username)) errors.username = "Invalid email";
  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else {
    if (!input.password) errors.password = "Password cannot be empty.";
  }

  return errors;
};

export default validate;
