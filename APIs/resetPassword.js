const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const route = express.Router();

route.post('/', async (req, res) => {
  
  username = req.body.username;
  password = req.body.password;
  const user = await Account.findOne({ username });
  const result = await Account.update({ username }, {
      $set: {
          password: password
      }
  });
  console.log(result);
  
  if ((username === user.username)) {
	//Account.update(username,{$set:{username:user.username,password:user.password}},{new:true});
	//Account.find(username:"khaihong.goh@gmail.com");
    res.json({ success: true });
	
  } else {
    res.status(401).send('Account not found.');
  }

});

module.exports = route;
