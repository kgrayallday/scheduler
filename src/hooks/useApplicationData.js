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
  
  // returns a days array with the new spot count
  function updateSpot(state) {

    let days = [];
    let spots = 0;

    // use find to create a hard copy of current day object
    const currentDay = state.days.find(dayObj => dayObj.name === state.day);
    
    // calculate spots remaining by counting null interviews of currentDay
    for (let interviewId of currentDay.appointments) {
      if (state.appointments[interviewId].interview === null) {
        spots++;
      }
    }

    // update the hard copy of state.day aka newDays by overriding old spots with new
    const newDay = { ...currentDay, spots }

    // use map to replace the new day obj in days and return as array
    return days = state.days.map(d => d.name === state.day ? newDay : d);


  }

  // books the interview and puts interview to db
  function bookInterview(id, interview) {

    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    const freshState = { ...state, appointments};
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => { 
        const days = updateSpot(freshState); 
        setState({ ...state, appointments, days }) 
      });
  }

  // cancel Interview and delete interview from db
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const freshState = { ...state, appointments};
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpot(freshState);
        setState({ ...state, appointments, days })
      });
  }

  // sets initial state of application via db
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}