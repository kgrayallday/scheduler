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

  const getStateInterviewerFromId = state.interviewers[interview.interviewer];
  return {interviewer: getStateInterviewerFromId, student:interview.student}

}

// returns interviewers available for given day
export function getInterviewersForDay(state, day) {

  // if no days in stateObj return empty array
  if (state.days.length === 0) {
    return [];
  }

  // filter only days which match given day
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);

  // if the day does not exist in state obj return empty array
  if (filteredDays.length === 0) {
    return [];
  }

  // pull out all the interviewers for given day
  const interviewers = filteredDays[0].interviewers;
  // return interviewers as array
  const mappedInterviewers = interviewers.map(ids => state.interviewers[ids]);
  return mappedInterviewers;

}
