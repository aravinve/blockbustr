const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const route = express.Router();

route.post('/', async (req, res) => {
	
  onetimepassword = req.body.onetimepassword;
  username = req.body.username;
  
  const user = await Account.findOne({ username });
  if ((username === user.username) & (onetimepassword === user.password)) {
	
	res.json({ success: true });
  
  } else {
    res.status(401).send('Account not found.');
  }
});

module.exports = route;
