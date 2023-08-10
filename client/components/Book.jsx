import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

function Book (props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={'book' + ' ' + theme}>
      <div className='book-subcontainer'>
        <input type='checkbox' id={props.id} checked={props.checkbox} onChange={() => props.onCheck(props.status, props.id)}></input>
        <p>{props.title}</p>
      </div>
      <p>{props.author}</p>
      <p>{props.status}</p>
    </div>
  )
}

export default Book;