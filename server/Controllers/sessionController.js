const SessionModel = require('../Models/sessionModel');

const sessionController = {};

//sessionController.getSession

sessionController.createSession = async (req, res, next) => {
  try {
    if (req.session.user) {
      return next();
    }

    const userID = res.locals.id;
    await SessionModel.create({
      cookieID: userID
    })
    req.session.user = userID;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in sessionController.createSession middleware: create session in db',
      status: 401,
      message: { err: error.message }
    })
  }
};

sessionController.deleteSession = async (req, res, next) => {
  try {
    const userID = req.session.user; //req.session.user != null
    console.log('userID: ', userID);
    const session = await SessionModel.findOneAndDelete({
      cookieID: userID
    })
    console.log('session: ', session);
    req.session = null;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in sessionController.deleteSession middleware: delete session in db',
      status: 401,
      message: { err: error.message }
    })
  }
};

module.exports = sessionController;