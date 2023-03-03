import React from 'react';

function Button (props) {
  return (
    <button id={props.action} onClick={() => props.onClick(props.action)}>
      {props.text}
    </button>
  )
}

export default Button;