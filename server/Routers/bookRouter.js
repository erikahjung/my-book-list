const express = require('express');
const bookController = require('../Controllers/bookController');

const BookRouter = express.Router();

//GET request to get books with a given status from the db
BookRouter.get('/:status', bookController.getBooks, (req, res) => {
  return res.status(200).json(res.locals.books);
  // return res.json(res.locals.books);
})

//GET request to get all books from the db
BookRouter.get('/', bookController.getBooks, (req, res) => {
  return res.json(res.locals.books);
})

//POST request to add a book to the db
BookRouter.post('/', bookController.addBook, (req, res) => {
  // return res.sendStatus(200);
  return res.status(200).json(res.locals.newBook);
})

//PATCH request to update a book in the db
BookRouter.patch('/:id', bookController.updateBook, (req, res) => {
  // return res.sendStatus(200);
  return res.status(200).json(res.locals.updatedBook);
})

//DELETE request to delete a book in the db
BookRouter.delete('/:id', bookController.deleteBook, (req, res) => {
  // return res.sendStatus(200);
  return res.status(200).json(res.locals.deletedBook);
})

module.exports = BookRouter;