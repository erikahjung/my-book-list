import React, { useState } from 'react';
import Button from './Button.jsx';

function Form (props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');

  // console.log(title);
  // console.log(author);
  // console.log(status);

  const submit = () => {
    setTitle('');
    setAuthor('');
    setStatus('');
    props.onSubmit(title, author, status)
  }

  return (
    <div id='form' style={props.display}>
      <h1>New Book!</h1>
      <div className='field'>
        <p><strong>Title: </strong></p>
        <input id='input-title' value={title} onInput={e => setTitle(e.target.value)}></input>
      </div>
      <div className='field'>
        <p><strong>Author: </strong></p>
        <input id='input-author' value={author} onInput={e => setAuthor(e.target.value)}></input>
      </div>
      <div className='field'>
        <p><strong>Status: </strong></p>
        <select id='input-status' defaultValue={status} onChange={e => setStatus(e.target.value)}>
          <option disabled hidden value=''></option>
          <option value="to-do">to-do</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <div className='field'>
        <Button text='Submit' onClick={() => submit()}/>
        <Button text='Cancel' onClick={props.onCancel}/>
      </div>
    </div>
  )
}

export default Form;