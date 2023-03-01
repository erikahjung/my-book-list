import React, { Component } from 'react';

class Book extends Component {
  render () {
    return (
      <div className='book'>
        <div className='book-subcontainer'>
          <input type='checkbox' id={this.props.id}></input>
          <p>{this.props.title}</p>
        </div>
        <p>{this.props.author}</p>
        <p>{this.props.status}</p>
      </div>
    )
  }
}

export default Book;