import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import Button from './Button.jsx';

function App () {
  const initialValue = {
    'to-do': [], 
    'in-progress': [], 
    'done': []
  };

  const [booklist, setBooklist] = useState(initialValue);

  useEffect(() => {
    Promise.all([
      fetch('/mybooklist/to-do'),
      fetch('/mybooklist/in-progress'),
      fetch('/mybooklist/done'),
    ])
      .then(([todoRes, inprogRes, doneRes]) => 
        Promise.all([todoRes.json(), inprogRes.json(), doneRes.json()])
      )
      .then(([todoData, inprogData, doneData]) => {
        setBooklist({
          'to-do': todoData,
          'in-progress': inprogData,
          'done': doneData
        })
      })
  }, [])

  return (
    <div id='app'>
        <div className='button-container'>
          <Button action='New Book!'/>
          <div className='edit-buttons'>
            <Button action='Update'/>
            <Button action='Delete'/>
          </div>
        </div>
        {Object.keys(booklist).map((status) => {
          // console.log(booklist[status])
          return <List key={status} id={status} books={booklist[status]}/>
        })}
      </div>
  )
}

export default App;