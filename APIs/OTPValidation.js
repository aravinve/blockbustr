const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const OTPassword = require('../database/passwordlogSchema');
const route = express.Router();

route.post('/', async (req, res) => {
	
  onetimepassword = req.body.onetimepassword;
  username = req.body.username;
  
  const user = await OTPassword.findOne({ username });
  if ((username === user.username) & (onetimepassword === user.onetimepassword)) {
	
	await OTPassword.remove({ username });
	res.json({ success: true });
  
  } else {
    res.status(401).send('Account not found.');
  }
});

module.exports = route;
