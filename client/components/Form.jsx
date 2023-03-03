import React, { useEffect, useState } from 'react';
import Button from './Button.jsx';

function Form (props) {
  const updateBookDetails = (key, value) => {
    const newState = { ...props.book };
    newState[key] = value;
    return newState;
  }

  return (
    <div id='form' style={props.book.display}>
      <h1>New Book!</h1>
      <div className='field'>
        <p>Title: </p>
        <input id='input-title' value={props.book.title} onInput={e => props.setBook(updateBookDetails('title', e.target.value))}></input>
      </div>
      <div className='field'>
        <p>Author: </p>
        <input id='input-author' value={props.book.author} onInput={e => props.setBook(updateBookDetails('author', e.target.value))}></input>
      </div>
      <div className='field'>
        <p>Status: </p>
        <select id='input-status' value={props.book.status} onChange={e => props.setBook(updateBookDetails('status', e.target.value))}>
          <option disabled hidden value=''></option>
          <option value="to-do">to-do</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <div className='field'>
        <Button action='submit' text='Submit' onClick={props.onSubmit}/>
        <Button text='Cancel' onClick={props.onCancel}/>
      </div>
    </div>
  )
}

export default Form;