import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  
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
    
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE, true));
  }

  // deletes appointment/interview from db
  function destroy(){
    
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(()=> (transition(EMPTY)))
      .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> } 
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM) } onEdit={ () => transition(EDIT) } /> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=> back()} onSave={save} /> }
      {mode === SAVING && <Status message={ 'Saving...' } /> }
      {mode === DELETING && <Status message={ 'Deleting...' } /> }
      {mode === CONFIRM && <Confirm student={props.interview.student} interviewer={props.interview.interviewer} onConfirm={ () => destroy() } onCancel={()=> back() }/> }
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} name={props.interview.student} onCancel={()=> back()} onSave={save}/> }
      {mode === ERROR_SAVE && <Error message={ 'Could not save...' } onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message={ 'Could not delete...' } onClose={() => back()} />}
    </article>
  )
};