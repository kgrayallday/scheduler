import React from "react";
import "styles/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  
  // gets appointments for current day for displaying in app appointments
  const currentDay = getAppointmentsForDay(state, state.day);
  
  // gets  available interviewers for current day 
  const currentInterviewers = getInterviewersForDay( state, state.day);
  
  // generate list used for printing out appointments to Appointment component
  const appointmentList = currentDay.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview = {interview}
        interviewers={currentInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  // return JSX
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