import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDIT = 'EDIT';

function Appointment(props) {
  // set our state variables
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saves interview to db
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(()=> transition(SHOW));
  }

  // this will delete from db
  function destroy(){
    transition(DELETING);
    props.cancelInterview(props.id).then(()=> transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />} 
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => destroy() } />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=> back()} onSave={save} />}
      {mode === SAVING && <Status message={ 'Saving...' } />}
      {mode === DELETING && <Status message={ 'Deleting...' } />}

      
    </article>
  )
}

export default Appointment;