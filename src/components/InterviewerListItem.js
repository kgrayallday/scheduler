import React from "react";
import './InterviewerListItem.scss';
import classNames from "classnames";

function InterviewerListItem(props) {

  return (
    <li className={props.selected ? 'interviewers__item--selected' : 'interviewers__item'}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ''}
    </li>
  );
}

export default InterviewerListItem;