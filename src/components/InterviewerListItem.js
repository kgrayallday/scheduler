import React from "react";
import '../styles/InterviewerListItem.scss';

function InterviewerListItem(props) {

  return (
    <li className={props.selected ? 'interviewers__item--selected' : 'interviewers__item'} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;