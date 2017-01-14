var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../lib/db');

router.get('/', function(req, res, next) {
    res.render('createUser', {
        title: 'Add new user'
    });
});

router.post('/', function(req, res, next) {
    if (!req.body.name || !req.body.email || !req.body.age) return response.status(400).send('Come on!');

    var user = new db.User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        agree: req.body.agree === 'on'
    });

    if(req.body.comment){
        user.comments = req.body.comment;
    }

    user.save(function (err, user) {
        res.redirect('/users');
    });
});

module.exports = router;
