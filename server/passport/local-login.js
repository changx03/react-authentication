const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config/config');

// Return the Passport Local Strategy object.
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    // session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim()
    };

    return User.findOne(
      {
        email: userData.email
      },
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          const credErr = new Error('Incorrect email or password');
          credErr.name = 'IncorrectCredentialsError';
          return done(credErr);
        }

        return user.comparePassword(userData.password, (cPassword, isMatch) => {
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            const credErr = new Error('Incorrect email or password');
            credErr.name = 'IncorrectCredentialsError';
            return done(credErr);
          }

          const payload = {
            sub: user._id
          };

          // Create a token string
          const token = jsonWebToken.sign(payload, config.secret);
          const data = {
            name: user.name
          };

          return done(null, token, data);
        });
      }
    );
  }
);
