const jsonWebToken = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config/config');

// The Auth Checker middleware function.
