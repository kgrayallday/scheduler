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

export function getInterview(state, interview) {
  // console.log('getInterview state >>> ', state);
  // console.log('getInterview interview passed >>> ', interview);
  // console.log('an appointments array >>> ', state.days[0].appointments)
  // console.log('an appointments interview obj >>> ', state.appointments['3'].interview)
  
  if (!interview) {
    return null;
  }

  // state contains { day{...}, appointments{...}, interviewers{...}}
  // state.days contains {id, name, appointments[1, 2, 3]}
  // state.appointments contains {key: {id, time, interview{...}}}
  // state.interviewers contains {avatar, id, name}

  // interview object contains { student: "name as string", interviewer: int ref interviewers id}

  // needs to return obj of { student: "string name", interviewer: {} } for displaying in each of our appointments 
  // given interview provide student + interview? 
  // from the current state, get the interviewer id and return the interviewer obj

  const getStateInterviewerFromId = state.interviewers[interview.interviewer];
  return {interviewer: getStateInterviewerFromId, student:interview.student}

}
