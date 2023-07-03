import React from 'react';
import Book from './Book.jsx';

function List (props) {
  return (
    <div className='list'>
      <h2 className={props.id}>{props.id}</h2>
      <div className='list-header'>
        <h3>Title</h3>
        <h3>Author</h3>
        <h3>Status</h3>
      </div>
      {props.books.map((book) => {
        // console.log(props.checkboxes);
        return <Book 
          key={book._id} 
          id={book._id} 
          title={book.title} 
          author={book.author} 
          status={book.status}
          checkbox={props.checkbox.id === book._id}
          onCheck={props.onCheck}
          />
      })}
    </div>
  )
}

export default List;