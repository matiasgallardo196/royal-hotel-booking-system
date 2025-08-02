const validateDateTime = (values) => {
  const error = {};
  const now = new Date();

  if (!values.date) {
    error.date = "Date is required";
  } else {
    const selectedDate = new Date(`${values.date}T00:00`);
    const minValidDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const dayOfWeek = selectedDate.getDay();

    if (selectedDate < minValidDate) {
      error.date = "Must select a date with at least 24 hours notice";
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      error.date = "Only Monday to Friday are allowed";
    }
  }

  if (!values.time) {
    error.time = "Time is required";
  } else {
    const dummyDate = values.date || "2000-01-01";
    const selectedDate = new Date(`${dummyDate}T${values.time}`);
    const selectedHour = selectedDate.getHours();

    if (selectedHour < 9 || selectedHour >= 18) {
      error.time = "Allowed hours are from 9:00 to 18:00";
    }
  }

  return error;
};
export default validateDateTime;
