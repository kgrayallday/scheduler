import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

function Form(props) {
  const [ name, setName ] = useState(props.name || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => {setInterviewer(null); setName(''); props.onCancel()}} danger>Cancel</Button>
          <Button onClick={() => props.onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;