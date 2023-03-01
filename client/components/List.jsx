import React, { Component } from 'react';
import Book from './Book.jsx';

class List extends Component {
  render () {
    return (
      <div className='list'>
        <h3>{this.props.id}</h3>
        <Book title='(title)' author='(author)' status='(status)'/>
        <Book title='(title)' author='(author)' status='(status)'/>
        <Book title='(title)' author='(author)' status='(status)'/>
      </div>
    )
  }
}

export default List;