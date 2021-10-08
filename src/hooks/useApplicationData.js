import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
  // update spots remaining in the DayList side nav UI
  function updateSpots(state) {
    let daysClone = [ ...state.days ];
    const currentDay = state.days.find(dayObj => dayObj.name === state.day);
    const index = currentDay.id -1;
    let countNulls = 0;

    // calculate spots remaining by counting null interviews of currentDay
    for (let interviewId of currentDay.appointments) {
      if (state.appointments[interviewId].interview === null) {
        countNulls++
      }
    }

    // update spots available in currentDay
    daysClone[index].spots = countNulls;
    const freshState = { ...state, days: daysClone }
 
    // set fresh state
    setState(freshState);

  }

  // books the interview and puts interview to db 
  function bookInterview(id, interview) {

    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    const freshState = { ...state, appointments};
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => { updateSpots(freshState); })
  }

  // cancel Interview and delete interview from db
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const freshState = { ...state, appointments};
    return axios.delete(`/api/appointments/${id}`)
      .then(() => { updateSpots(freshState); });
  };

  // sets initial state of application via db
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {  
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};