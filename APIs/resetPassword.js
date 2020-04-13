const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const route = express.Router();

route.get('/', async (req, res) => {
  username = req.query.username.toString();
  password = req.query.password.toString();
      
  const user = await Account.findOne({ username });
  
  if (username === user.username) {
    const result = await Account.update(
      { username },
      {
        $set: {
          password: password
        }
      }
    );
	
	res.json({ 
		success: true 
	});
	
  } else {

	res.json({ 		
		message: "Potential XSS detected, please re-enter your new password!",
		success: false 
	});
 
  
  }
});

module.exports = route;
