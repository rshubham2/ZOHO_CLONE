const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // TODO: Implement actual login logic
  res.json({ message: 'Login successful', token: 'dummy_token' });
});

module.exports = router;