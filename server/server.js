const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();

const bookController = require('./Controllers/bookController');

//connect to the mongoDB
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  // sets the name of the DB that our collections are part of
  dbName: 'booklist'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

//parse the application/json & the application/x-www-form-urlencoded incoming Request Object
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//serve the client the html file and webpack bundle.js file
// if (process.env.NODE_ENV === 'production') {
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'))
})
// }

const bookRouter = express.Router();
app.use('/mybooklist', bookRouter);

//GET request to get books with a given status from the db
bookRouter.get('/:status', bookController.getBooks, (req, res) => {
  return res.status(200).json(res.locals.books);
  // return res.json(res.locals.books);
})

//GET request to get all books from the db
bookRouter.get('/', bookController.getBooks, (req, res) => {
  return res.json(res.locals.books);
})

//POST request to add a book to the db
bookRouter.post('/', bookController.addBook, (req, res) => {
  // return res.sendStatus(200);
  return res.status(200).json(res.locals.newBook);
})

//PATCH request to update a book in the db
bookRouter.patch('/:id', bookController.updateBook, (req, res) => {
  // return res.sendStatus(200);
  return res.status(200).json(res.locals.updatedBook);
})

//DELETE request to delete a book in the db
bookRouter.delete('/:id', bookController.deleteBook, (req, res) => {
  // return res.sendStatus(200);
  return res.status(200).json(res.locals.deletedBook);
})

//unknown route handler
app.use((req, res) => {
  return res.sendStatus(404);
})

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
})

//start the server on PORT
app.listen(PORT, () => {console.log(`Listening on PORT: ${PORT}...`)});