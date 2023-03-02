const mongoose = require('mongoose');
const Book = require('./bookModel');

const bookController = {
  //get books by status in the db
  getBooks: (req, res, next) => {
    const { status } = req.params;
    Book.find({ status })
      .then((bookArr) => {
        // console.log('bookController.getBooks: ', bookArr);
        // if (bookArr.length === 0) {
        //   res.status(400);
        // } else {
        //   res.status(200);
        // }
        res.locals.books = bookArr;
        return next();
      })
      .catch((error) => {
        return next({
          log: 'MongoDB error occurred in bookController.getBooks method',
          message: {err : error}
        });
      })
  },

  //add a book to the db
  addBook: (req, res, next) => {
    const { title, author, status } = req.body;
    console.log('bookController.addBook req.body: ', req.body);
    Book.create({ title, author, status })
      .then((newBook) => {
        console.log('bookController.addBook sucessful: ', newBook);
        res.locals.newBook = newBook;
        return next();
      })
      .catch((error) => {
        return next({
          log: 'MongoDB error occurred in bookController.addBook method',
          message: {err : error}
        });
      })
  },

  //update a book in the db
  updateBook: (req, res, next) => {
    const { id } = req.params;
    const { title, author, status } = req.body;
    console.log('bookController.updateBook req.params: ', req.params);
    console.log('bookController.updateBook req.body: ', req.body);
    Book.findOneAndUpdate({ _id : new mongoose.Types.ObjectId(id) }, { title, author, status }, { new: true })
      .then((updatedBook) => {
        console.log('bookController.updateBook sucessful: ', updatedBook);
        res.locals.updatedBook = updatedBook;
        return next();
      })
      .catch((error) => {
        return next({
          log: 'MongoDB error occurred in bookController.updateBook method',
          message: {err : error}
        })
      })
  },

  //delete a book in the db
  deleteBook: (req, res, next) => {
    const { id } = req.params;
    console.log('bookController.deleteBook req.params: ', req.params);
    Book.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
      .then((deletedBook) => {
        console.log('bookController.deleteBook sucessful: ', deletedBook);
        res.locals.deletedBook = deletedBook;
        return next();
      })
      .catch((error) => {
        return next({
          log: 'MongoDB error occurred in bookController.deleteBook method',
          message: {err : error}
        })
      })
  }
}

module.exports = bookController;