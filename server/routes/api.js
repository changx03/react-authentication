const express = require('express');

const router = express.Router();
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: 'You are authorized to see this secret message.',
    username: res.locals.username
  });
});

module.exports = router;
