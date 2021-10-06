import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application() {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // console.log('㉿ Application state from useApplicationData', state)

  const appointmentsByDay = getAppointmentsForDay(state, state.day); // gets appointments for given day for displaying in app appointments
  const interviewersByDay = getInterviewersForDay( state, state.day); // gets  available interviewers for a given day 
  
  const appointmentList = appointmentsByDay.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    // console.log(' ㉿ "appointment" in app ', appointment)
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview = {interview}
        interviewers={interviewersByDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}