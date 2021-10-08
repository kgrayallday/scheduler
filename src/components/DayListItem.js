import React from "react";
import classNames from "classnames";
import '../styles/DayListItem.scss';

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  let h2Class = classNames('text--regular', {
    'day-list__item--selected': props.selected
  });

  const formatSpots = (spotsProp) => {
    if (spotsProp === 1) { return '1 spot remaining'; }
    if (spotsProp === 0){ return 'no spots remaining'; }
    return `${spotsProp} spots remaining`;
  };
  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className={h2Class}>{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}