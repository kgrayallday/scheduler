import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {

  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function updateSpots() {
    // calc the num of spots remaining in the side nav
    const { cuurentSpots } = { ...state, spots }
  }

  // books the interview and calls save to put to db via save in application 
  function bookInterview(id, interview) {
    // console.log('㉿ bookInterview fn call');

    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState({ ...state, appointments }))
      .catch(error => console.log(error.message));
  }

  // cancel Interview 
  function cancelInterview(id) {
    // console.log('㉿ cancelInterview fn call - - -')

    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        // console.log('㉿ delete response', response);
        setState({ ...state, appointments })})
  }


  useEffect(()=>{
    // console.log('㉿ USE EFFECT CALL');
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