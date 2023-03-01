import React, { useState } from 'react';
import Book from './Book.jsx';

function List (props) {
  const initialValue = [
    {id: 1, title: '(title)', author: '(author)', status: '(status)'},
    {id: 2, title: '(title)', author: '(author)', status: '(status)'},
    {id: 3, title: '(title)', author: '(author)', status: '(status)'}
  ]

  const [ books, setBooks ] = useState(initialValue);

  return (
    <div className='list'>
      <h3>{props.id}</h3>
      {books.map((book) => {
        return <Book key={book.id} id={book.id} title={book.title} author={book.author} status={book.status}/>
      })}
    </div>
  )
}

export default List;