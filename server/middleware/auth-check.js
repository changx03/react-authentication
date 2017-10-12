const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../../config/config');

// The Auth Checker middleware function.
module.exports = function authCheck(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jsonWebToken.verify(token, config.secret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userID = decoded.sub;
    return User.findById(userID, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      res.locals.username = user.name;
      return next();
    });
  });
};
