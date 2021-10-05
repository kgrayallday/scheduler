import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day); // gets appointments for given day for displaying in app appointments
  const interviewers = getInterviewersForDay( state, state.day); // gets  available interviewers for a given day 

  
  
  // books the interview and calls save to put to db via save in application 
  function bookInterview(id, interview) {

    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => { setState({ ...state, appointments })})
      .catch(error => console.log(error.message));
  }

  // cancel Interview 
  function cancelInterview(id) {

    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => { setState({ ...state, appointments })})
      .catch(error => console.log(error.message))
  }

  const appointmentList = dailyAppointments.map(appointment => {

    let interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview} 
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        setState={setState}
        state={state}
      />)
      
  });



  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'), //res.data[0] = [appointments[...], interviewers[...], name, spots]
      axios.get('/api/appointments'), //res.data[0] = 1 : {id, time, interview{...}}
      axios.get('/api/interviewers'), //res.data[0] = 1 : {avatar, id, name}
    ]).then((all) => {  
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList days={state.days} day={state.day} setDay={setDay}/></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentList }
      </section>
    </main>
  );
}