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
  const emptyForm = {
    display: {display: 'none'},
    id: null,
    title: '',
    author: '',
    status: ''
  }

  const [booklist, setBooklist] = useState(emptyBooklist);
  const [checkboxes, setCheckboxes] = useState(emptyCheckboxes);
  const [change, setChange] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [request, setRequest] = useState('');

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

  const toggleForm = (action) => {
    if (form.display.display === 'none') {
      if (action === 'add') {
        const fields = {
          display: {display: 'flex'},
          id: null,
          title: '',
          author: '',
          status: ''
        }
        setForm(fields);
        setRequest('add');
      }
      if (action === 'update') {
        let updateBookId;
        let updateBookStat;
        for (const status in checkboxes) {
          for (const bookId in checkboxes[status]) {
            if (checkboxes[status][bookId] === true) {
              if (updateBookId) {
                return;
              }
              updateBookId = bookId;
              updateBookStat = status;
            }
          }
        }
        if (updateBookId) {
          let updateBook;
          booklist[updateBookStat].forEach((book) => {
            if (book._id === updateBookId) {
              updateBook = book;
            }
          })
          const fields = {
            display: {display: 'flex'},
            id: updateBookId,
            title: updateBook.title,
            author: updateBook.author,
            status: updateBook.status
          }
          // console.log(fields);
          setForm(fields);
          setRequest('update');
        }
      }
    } else {
      setForm({
        display: {display: 'none'},
        id: null,
        title: '',
        author: '',
        status: ''
      })
      setRequest('');
    }
    setChange(change + 1);
  }

  const handleAddOrUpdate = () => {
    if (request === 'add') {
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
    if (request === 'update') {
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
          .then((deletedBook) => {
            console.log(deletedBook)
            setChange(change + 1);
          })
          .catch((error) => console.log('Error with DELETE request: ', error));
      })
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

  // console.log(request);

  return (
    <div id='app'>
       <Form 
        book={form}
        setBook={setForm}
        onCancel={toggleForm}
        onSubmit={handleAddOrUpdate}
        />
        <div className='button-container'>
          <Button 
            text='Add Book!'
            onClick={toggleForm}
            action='add'
            />
          <div className='edit-buttons'>
            <Button 
              text='Update'
              onClick={toggleForm}
              action='update'
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