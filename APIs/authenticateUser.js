const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const route = express.Router();

route.post('/', async (req, res) => {
  username=req.body.username
  password=req.body.password
  const user = await Account.findOne({ username });

  console.log(user.username);
  if (username==user.username & password==user.password) {
    res.redirect('/profile')
  } else {
      res.status(401).send('Account not found.')

    }


});

module.exports = route;
