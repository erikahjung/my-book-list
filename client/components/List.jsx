import React, { useState } from 'react';
import Book from './Book.jsx';

function List (props) {
  return (
    <div className='list'>
      <h3>{props.id}</h3>
      {props.books.map((book) => {
        return <Book key={book._id} id={book._id} title={book.title} author={book.author} status={book.status}/>
      })}
    </div>
  )
}

export default List;