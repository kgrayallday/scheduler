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
  
  function updateSpots(modifier) {
    const BOOKING = 'BOOKING';
    const CANCEL = 'CANCEL';

    let daysClone = [ ...state.days ];
    
    const foundDay = state.days.find(dayObj => dayObj.name === state.day);
    
    const index = foundDay.id -1;

    if(modifier === BOOKING) {
      daysClone[index].spots--;
    }
    if(modifier === CANCEL) {
      daysClone[index].spots++;
    }

    const newState = { ...state, days: daysClone }
 
    setState(newState);

  }

  // books the interview and calls save to put to db via save in application 
  function bookInterview(id, interview) {

    const appointment = { ...state.appointments[id], interview: { ...interview } };

    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({ ...state, appointments });
        updateSpots('BOOKING');
      })
  }

  // cancel Interview 
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => { 
        setState({ ...state, appointments })
        updateSpots('CANCEL');
      
      });
  };


  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'), //res.data[0] = [appointments[...], interviewers[...], name, spots]
      axios.get('/api/appointments'), //res.data[0] = 1 : {id, time, interview{...}}
      axios.get('/api/interviewers'), //res.data[0] = 1 : {avatar, id, name}
    ]).then((all) => {  
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};