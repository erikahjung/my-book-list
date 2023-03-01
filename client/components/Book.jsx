import React, { useState } from 'react';

function Book (props) {
  return (
    <div className='book'>
      <div className='book-subcontainer'>
        <input type='checkbox' id={props.id}></input>
        <p>{props.title}</p>
      </div>
      <p>{props.author}</p>
      <p>{props.status}</p>
    </div>
  )
}

export default Book;