import React from "react";
import classNames from "classnames";
import './DayListItem.scss';

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0})
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}