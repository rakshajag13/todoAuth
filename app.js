const express=require('express');
var app=express();
const PORT=process.env.PORT ||4200;

var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var url = 'mongodb://localhost:27017/uapplication'
mongoose.connect(url, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`application connected to ${url}`)
    }
});
var auths=require('./routes/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/authapp/v1/auths',auths);

app.listen(PORT);
console.log("server started");