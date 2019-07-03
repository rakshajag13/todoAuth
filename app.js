const express=require('express');
var app=express();
const PORT=process.env.PORT ||4200;

var mongoose = require('mongoose');
var bodyParser=require('body-parser');
//var url = 'mongodb://localhost:27017/uapplication'
var url = 'mongodb://uapp:uapp123@ds243717.mlab.com:43717/uapplication'
//var url='mongodb+srv://raksha:Raksha123@cluster0-zxws0.mongodb.net/uapplication?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true} ,function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`application connected to ${url}`)
    }
});
var auths=require('./routes/auth');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/authapp/v1/auths',auths);

app.listen(PORT);
console.log("server started");
