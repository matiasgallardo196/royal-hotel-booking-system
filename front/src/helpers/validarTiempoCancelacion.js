const validarTiempoCancelacion = (turno) => {
  if (!turno || !turno.date || !turno.time || !turno.status) {
    return "Missing data to validate cancellation.";
  }

  if (turno.status.toLowerCase() !== "active") {
    return "Only appointments with ACTIVE status can be cancelled.";
  }

  const turnoFechaHora = new Date(`${turno.date}T${turno.time}`);

  const ahora = new Date();

  const minCancelacion = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);

  if (turnoFechaHora <= minCancelacion) {
    return "Appointment can only be cancelled with at least 24 hours notice.";
  }

  return null;
};

export default validarTiempoCancelacion;
