const mongoose = require('mongoose');
const UserModel = require('../Models/userModel');
const bcrypt = require("bcrypt");

const userController = {
  //find a user in the db
  getUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

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

      res.locals.id = user._id;
      return next();
    } catch (error) {
      const err = {
        log: 'Express error in userController.getUser middleware',
        status: 500,
        message: { err: error.message }
      }
      return next(err);
    }
  },
  //create a user in the db
  createUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const existingUsername = await UserModel.findOne({ username });

      if (existingUsername) {
        const err = {
          log: 'Express error in userController.createUser middleware: validate username',
          status: 401,
          message: { err: 'Username already exists' }
        }
        return next(err);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const { _id } = await UserModel.create({ 
        username, 
        password: hashedPassword 
      });

      res.locals.id = _id;
      return next();
    } catch (error) {
      const err = {
        log: 'Express error in userController.createUser middleware',
        status: 500,
        message: { err: error.message }
      }
      return next(err);
    }
  },
  //delete a user from the db
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { _id } = await UserModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
      
      res.locals.id = _id;
      return next();
    } catch (error) {
        const err = {
          log: 'Express error in userController.deleteUser middleware',
          status: 500,
          message: { err: error.message }
        }
        return next(err);
    }
  },
  //updateUser - for example, update username
}

module.exports = userController;