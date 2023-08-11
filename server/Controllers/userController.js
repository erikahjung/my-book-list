const mongoose = require('mongoose');
const User = require('../Models/userModel');
const bcrypt = require("bcrypt");

const userController = {
  getUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        const err = {
          log: 'Express error in userController.getUser middleware: find user in the database',
          status: 401,
          message: { err: 'User not found' }
        }
        return next(err);
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        const err = {
          log: 'Express error in userController.getUser middleware: validate password',
          status: 401,
          message: { err: 'Incorrect password' }
        }
        return next(err);
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      const err = {
        log: 'Express error in userController.getUser middleware',
        status: 500,
        message: { err: error.message }
      }
      return next(err);
    }
  }

  //createUser
  //deleteUser
}

module.exports = userController;