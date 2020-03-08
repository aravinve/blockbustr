const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const route = express.Router();

route.post('/', async(req,res)=>{
    const { username, password, firstName, lastName, email } = req.body;
    let account = {};
    account.username = username;
    account.password = password;
    account.firstName = firstName;
    account.lastName = lastName;
    account.email = email;

    let accountModel = new Account(account);
    await accountModel.save();
    res.json(accountModel);
});

module.exports = route;
