const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();

const BookRouter = require('./Routers/bookRouter');
const UserRouter = require('./Routers/userRouter');

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

//router for books
app.use('/api/book', BookRouter);
//router for users
app.use('/api/user', UserRouter);

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