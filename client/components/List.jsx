import React from 'react';
import Book from './Book.jsx';

function List (props) {
  return (
    <div className='list'>
      <h2>{props.id}</h2>
      <div className='list-header'>
        <h5>Title</h5>
        <h5>Author</h5>
        <h5>Status</h5>
      </div>
      {props.books.map((book) => {
        // console.log(props.checkboxes);
        console
        return <Book 
          key={book._id} 
          id={book._id} 
          title={book.title} 
          author={book.author} 
          status={book.status}
          checkbox={props.checkboxes[book._id]}
          onCheck={props.onCheck}
          />
      })}
    </div>
  )
}

export default List;