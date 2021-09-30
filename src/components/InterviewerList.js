import React from "react";
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss'

function InterviewerList(props) {

  const { interviewers } = props

  const list = interviewers.map(inter => <InterviewerListItem id={inter.id} name={inter.name} avatar={inter.avatar} selected={inter.id === props.interviewer}/>);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  );
}

export default InterviewerList;