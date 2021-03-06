const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const Comment = require('../database/commentlogSchema');
const route = express.Router();

route.post('/', async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const existingUserName = await Account.findOne({ username });
  
  if (existingUserName) {
	
	res.json({ 	
		message: "The username already exists. Please use a different username",
		success: false
	});

	}  
  
  let account = {};
  account.username = username;
  account.password = password;
  account.firstName = firstName;
  account.lastName = lastName;
  account.email = email;

  let accountModel = new Account(account);
  await accountModel.save();
  res.json({ success: true });
});

module.exports = route;
