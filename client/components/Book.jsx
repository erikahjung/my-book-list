import React from 'react';

function Book (props) {
  // console.log(props);

  return (
    <div className='book'>
      <div className='book-subcontainer'>
        <input type='checkbox' id={props.id} checked={props.checkbox} onChange={() => props.onCheck(props.id, props.status)}></input>
        <p>{props.title}</p>
      </div>
      <p>{props.author}</p>
      <p>{props.status}</p>
    </div>
  )
}

export default Book;