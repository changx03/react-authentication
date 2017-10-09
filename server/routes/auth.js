const express = require('express');
const validator = require('validator');

const router = express.Router();

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length < 4) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false;
    errors.password = 'Password must have at least 6 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(500).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});

module.exports = router;
