const express = require('express');
const Account = require('../database/accountSchema');
const route = express.Router();

route.post('/', async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  const user = await Account.findOne({ username });
  if ((username === user.username) & (password === user.password)) {
    res.json({ success: true });
  } else {
    res.status(401).send('Account not found.');
  }
});

module.exports = route;
