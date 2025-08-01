const validateCancellationTime = (appointment) => {
  // Check if appointment data is valid
  if (
    !appointment ||
    !appointment.date ||
    !appointment.time ||
    !appointment.status
  ) {
    return "Invalid appointment data";
  }

  // Check if appointment is active
  if (appointment.status.toLowerCase() !== "active") {
    return "Only ACTIVE appointments can be cancelled.";
  }

  // Calculate appointment date and time
  const appointmentDateTime = new Date(
    `${appointment.date}T${appointment.time}`
  );
  const now = new Date();

  // Calculate minimum cancellation time (24 hours before)
  const minCancellationTime = new Date(
    appointmentDateTime.getTime() - 24 * 60 * 60 * 1000
  );

  // Check if it's too late to cancel
  if (appointmentDateTime <= minCancellationTime) {
    return "Appointments can only be cancelled with at least 24 hours notice.";
  }

  return null; // No error
};

export default validateCancellationTime;
