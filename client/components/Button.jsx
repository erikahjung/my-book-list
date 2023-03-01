import React from 'react';

function Button (props) {
  return (
    <button>
      {props.action}
    </button>
  )
}

export default Button;