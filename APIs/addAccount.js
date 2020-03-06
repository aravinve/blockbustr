const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const route = express.Router();

console.log(Account);
route.post('/', async(req,res)=>{
    const { username, password, firstName, lastName, email } = req.body;
    let account = {};
    account.username = username;
    account.password = password;
    account.firstName = firstName;
    account.lastName = lastName;
    account.email = email;

    let accountModel = new User(account);
    await accountModel.save();
    res.json(accountModel);
});

module.exports = route;
