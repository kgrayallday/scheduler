import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [ name, setName ] = useState(props.name || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const validate = () => {
    if (name === '') {
      setError("student name cannot be blank");
      return;
    }

    // mandatory interviewer selection validation
    if (!interviewer) {
      setError('Interviewer cannot be blank');
      return;
    }

    setError('');
    props.onSave(name, interviewer);
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}