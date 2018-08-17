const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Landing page works.')
});

module.exports = { router };
