export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  };

  const filteredAppointments = state.days.filter(appointment => appointment.name === day);

  if (filteredAppointments.length === 0) {
    return [];
  };
  const appointmentIds = filteredAppointments[0].appointments;
  const mappedAppointments = appointmentIds.map(ids => state.appointments[ids]);
  return mappedAppointments;

};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  };

  const getStateInterviewerFromId = state.interviewers[interview.interviewer];
  return {interviewer: getStateInterviewerFromId, student:interview.student}

};

// returns interviewers available for given day
export function getInterviewersForDay(state, day) {

  // if no days in stateObj return empty array
  if (state.days.length === 0) {
    return [];
  };

  // filter only days which match given day
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);

  // if the day does not exist in state obj return empty array
  if (filteredDays.length === 0) {
    return [];
  };

  // pull out all the interviewers for given day
  const interviewers = filteredDays[0].interviewers;
  // return interviewers as array
  const mappedInterviewers = interviewers.map(ids => state.interviewers[ids]);
  return mappedInterviewers;

};
