import React from 'react';
import List from './List.jsx';
import Button from './Button.jsx';

function App () {
  const bookStatus = ['to-do', 'in-progress', 'done'];

  return (
    <div id='app'>
        <div className='button-container'>
          <Button action='New Book!'/>
          <div className='edit-buttons'>
            <Button action='Update'/>
            <Button action='Delete'/>
          </div>
        </div>
        {bookStatus.map((status) => {
          return <List key={status} id={status}/>
        })}
      </div>
  )
}

export default App;