const validateNewAppointment = (values) => {
  const error = {};

  // Date validation
  if (!values.date) {
    error.date = "Date is required";
  } else {
    const selectedDate = new Date(values.date);
    const today = new Date();
    const minDate = new Date();
    minDate.setHours(today.getHours() + 24);

    if (selectedDate < minDate) {
      error.date = "You must select a date with at least 24 hours in advance";
    } else {
      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        error.date = "Only Monday to Friday appointments are allowed";
      }
    }
  }

  // Time validation
  if (!values.time) {
    error.time = "Time is required";
  } else {
    const [hours, minutes] = values.time.split(":").map(Number);
    const appointmentTime = hours * 60 + minutes;
    const startTime = 9 * 60; // 9:00 AM
    const endTime = 18 * 60; // 6:00 PM

    if (appointmentTime < startTime || appointmentTime >= endTime) {
      error.time = "Appointments are only allowed between 9:00 AM and 6:00 PM";
    }
  }

  return error;
};

export default validateNewAppointment;
