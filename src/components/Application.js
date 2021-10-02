import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const setDay = day =>setState({ ...state, day });
  // const setDays = days =>setState(prev => ({ prev, days}));  --- removed by compass

  const list = dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} /> );

  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'), //res.data[0] = [appointments[...], interviewers[...], name, spots]
      axios.get('/api/appointments'), //res.data[0] = 1 : {id, time, interview{...}}
      axios.get('/api/interviewers'), //res.data[0] = 1 : {avatar, id, name}
    ]).then((all) => {  
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviews: all[2].data
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
        { list }
      </section>
    </main>
  );
}