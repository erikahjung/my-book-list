import React, { Component } from 'react';
import List from './List.jsx';
import Button from './Button.jsx';

class App extends Component {
  render () {
    return (
      <div id='app'>
        <div className='button-container'>
          <Button action='New Book!'/>
          <div className='edit-buttons'>
            <Button action='Update'/>
            <Button action='Delete'/>
          </div>
        </div>
        <List id='to-do'/>
        <List id='in-progress'/>
        <List id='done'/>
      </div>
    )
  }
}

export default App;