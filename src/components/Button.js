import React from "react";
import "components/Button.scss";
const classNames = require('classnames');

export default function Button(props) {
   let buttonClass = classNames('button', {'button--confirm': props.confirm, 'button--danger': props.danger})

   return <button onClick={props.onClick} className={buttonClass} disabled={props.disabled}>{props.children}</button>;
}
