var Router = require('express').Router();
var AUTH = require('../models/model_auth');
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');

Router.post('/register', function (req, res) {
    var body = req.body;
    var authObj = new AUTH(body);
    authObj.save(function (err, data) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})


Router.post('/login', function (req, res) {
    var body = req.body;
    AUTH.findOne({ userId: body.userId }, function (err, data) {
        if (err) {
            res.status(500).send("db error");
        }
        else {
            data.comparePwd(body.password, function (ismatch) {
                if (ismatch) {
                    let token = jwt.sign({ userId: data.userId },
                        config.secret,
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    res.status(200).send({ token: token, sucess: true, message: "authentication sucessful" });
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Authentication failed! Please check the request'
                    });
                }
            })
        }
    })

})

Router.post('/validate',middleware.checkToken,(req,res,next) => {
    res.send(req.decoded)

    


})



module.exports = Router
