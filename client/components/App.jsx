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
  const emptyCheckbox = {
    'status': null,
    'id': null
  };
  const emptyForm = {
    display: { display: 'none' },
    id: null,
    title: '',
    author: '',
    status: ''
  }

  const [booklist, setBooklist] = useState(emptyBooklist);
  const [checkbox, setCheckbox] = useState(emptyCheckbox);
  const [change, setChange] = useState(0);
  const [form, setForm] = useState(emptyForm);

  const handleCheck = (status, id) => {
    // console.log(status, id);

    if (!checkbox.id) {
      setCheckbox({ status, id });
    } else if (checkbox.id === id) {
      setCheckbox(emptyCheckbox);
    }
  }

  const toggleForm = (action) => {
    if (form.display.display === 'none') {
      if (action === 'Add') {
        setForm({ 
          ...emptyForm, 
          display: { display: 'flex' }
        });
      }
      if (action === 'Update' && checkbox.id) {
        const updateBook = booklist[checkbox.status][checkbox.id]; //undefined - need to figure out why form is pre-populating with book data on Update button click
        console.log(updateBook);

        setForm({
          ...updateBook,
          display: { display: 'flex' }
        })
      }
    } else {
      setForm(emptyForm);
    }
    setCheckbox(emptyCheckbox);
    setChange(change => change + 1);
  }

  const handleAddOrUpdate = (event) => {
    if (!form.title || !form.author || !form.status) return toggleForm();

    if (event === 'Add') {
      const reqOptions = { 
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ 
          "title": form.title, 
          "author": form.author, 
          "status": form.status 
        })
      };
      // console.log(reqOptions);
      fetch('/mybooklist', reqOptions)
        .then((res) => res.json())
        .then((newBook) => {
          console.log(newBook)
          toggleForm();
        })
        .catch((error) => console.log('Error with POST request: ', error));
    }
    //server will only udpate the status if changed
    if (event === "Update") {
      const reqOptions = { 
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ 
          "title": form.title, 
          "author": form.author, 
          "status": form.status 
        })
      };
      // console.log(reqOptions);
      fetch(`/mybooklist/${form.id}`, reqOptions)
        .then((res) => res.json())
        .then((updatedBook) => {
          console.log(updatedBook)
          toggleForm();
        })
        .catch((error) => console.log('Error with PATCH request: ', error));
    }
  }

  const handleDelete = () => {
    if (checkbox.id) {
      fetch(`/mybooklist/${checkbox.id}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then((deletedBook) => {
            console.log(deletedBook)
            setChange(change => change + 1);
            setCheckbox(emptyCheckbox);
          })
          .catch((error) => console.log('Error with DELETE request: ', error));
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
      })
      .catch((error) => console.log(error));
  }, [change])

  return (
    <div id='app'>
       <Form 
        book={form}
        setBook={setForm}
        onCancel={toggleForm}
        onSubmit={handleAddOrUpdate}
        text={form.id ? 'Update' : 'Add'}
        />
        <div className='button-container'>
          <Button 
            text='Add Book!'
            onClick={toggleForm}
            action='Add'
            />
          <div className='edit-buttons'>
            <Button 
              text='Update'
              onClick={toggleForm}
              action='Update'
              />
            <Button 
              text='Delete'
              onClick={handleDelete}
              action='Delete'
            />
          </div>
        </div>
        {Object.keys(booklist).map((status) => {
          return <List 
            key={status} 
            id={status} 
            books={booklist[status]} 
            checkbox={checkbox} 
            onCheck={handleCheck}
            />
        })}
      </div>
  )
}

export default App;