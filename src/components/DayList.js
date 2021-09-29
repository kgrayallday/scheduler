import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {

  const { days } = props;
  console.log('dayData from props', days);

  const dayList = days.map(day => 
    <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  
    />
  )

  return (
    <ul>
      {dayList}
    </ul>
  )
}

export default DayList;