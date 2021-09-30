import React from "react";
import classNames from "classnames";
import './DayListItem.scss';

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0})

  const formatSpots = (spotsProp) => {
    if (spotsProp === 1) {
      // spot remaining 
      return '1 spot remaining';
    }
    if (spotsProp === 0){
      return 'no spots remaining';
    }
    return `${spotsProp} spots remaining`;
  }
  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}