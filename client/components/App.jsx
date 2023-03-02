import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import Button from './Button.jsx';
import Form from './Form.jsx';

function App () {
  const emptyBooklist = {
    'to-do': [], 
    'in-progress': [], 
    'done': []
  };
  const emptyCheckboxes = {
    'to-do': {}, 
    'in-progress': {}, 
    'done': {}
  };
  const [booklist, setBooklist] = useState(emptyBooklist);
  const [checkboxes, setCheckboxes] = useState(emptyCheckboxes);
  const [change, setChange] = useState(0);
  const [form, setForm] = useState({display: 'none'});

  const handleCheck = (id, stat) => {
    const updatedCheckboxes = Object.assign({}, checkboxes[stat]);
    for (const bookId in updatedCheckboxes) {
      if (bookId === id) {
        updatedCheckboxes[bookId] = !updatedCheckboxes[bookId];
      }
    }
    const newCheckboxes = {};
    newCheckboxes[`${stat}`] = updatedCheckboxes;
    setCheckboxes({...checkboxes, ...newCheckboxes});
  }

  const toggleForm = () => {
    if (form.display === 'none') {
      setForm({display: 'flex'});
    } else {
      setForm({display: 'none'})
    }
    setChange(change + 1);
  }

  const handleAdd = (title, author, status) => {
    const reqOptions = { 
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        "title": title, 
        "author": author, 
        "status": status 
      })
    };
    console.log(reqOptions);
    fetch('/mybooklist', reqOptions)
      .then((res) => res.json())
      .then((newBook) => {console.log(newBook)})
      .catch((error) => console.log('Error with POST request: ', error));
    toggleForm();
  }

  const handleDelete = () => {
    const deleteBooks = [];
    for (const status in checkboxes) {
      for (const bookId in checkboxes[status]) {
        if (checkboxes[status][bookId] === true) {
          deleteBooks.push(bookId);
        }
      }
    }
    if (deleteBooks.length > 0) {
      deleteBooks.forEach((bookId) => {
        fetch(`/mybooklist/${bookId}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then((deletedBook) => console.log(deletedBook))
          .catch((error) => console.log('Error with DELETE request: ', error));
      })
      setChange(change + 1);
    }
  }

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
        const initialBooklist = {
          'to-do': todoData,
          'in-progress': inprogData,
          'done': doneData
        };
        setBooklist(initialBooklist);

        const initialCheckboxes = {};
        for (const key in initialBooklist) {
          initialCheckboxes[key] = {};
          initialBooklist[key].forEach((book) => {
            initialCheckboxes[key][book._id] = false;
          })
        }
        setCheckboxes(initialCheckboxes);
      })
  }, [change])

  console.log(form);
  console.log(change);

  return (
    <div id='app'>
       <Form 
        display={form}
        onCancel={toggleForm}
        onSubmit={handleAdd}
        />
        <div className='button-container'>
          <Button 
            text='Add Book!'
            onClick={toggleForm}
            />
          <div className='edit-buttons'>
            <Button 
              text='Update'
              onClick={() => {console.log('Update')}}
              />
            <Button 
              text='Delete'
              onClick={handleDelete}
            />
          </div>
        </div>
        {Object.keys(booklist).map((status) => {
          return <List 
            key={status} 
            id={status} 
            books={booklist[status]} 
            checkboxes={checkboxes[status]} 
            onCheck={handleCheck}
            />
        })}
      </div>
  )
}

export default App;