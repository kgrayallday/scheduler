export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  if (state.days.length === 0) {
    return [];
  }

  const filteredAppointments = state.days.filter(appointment => appointment.name === day);

  if (filteredAppointments.length === 0) {
    return [];
  }
  const appointmentIds = filteredAppointments[0].appointments;
  const mappedAppointments = appointmentIds.map(ids => state.appointments[ids]);
  return mappedAppointments;

}