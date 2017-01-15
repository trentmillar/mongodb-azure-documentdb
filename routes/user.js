var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../lib/db');

router.get('/', function(req, res, next) {
    res.render('createUser', {
        title: 'Add new user',
        user : new db.User()
    });
});

router.get('/:email', function(req, res, next) {
    db.User.findOne({email: req.params.email}, function (err, user) {
        res.render('createUser', {
            title: 'Update user',
            user: user || new db.User()
        });

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

router.post('/remove/:email', function(req, res, next) {

    db.User.findOne({email: req.params.email}, function (err, user) {
        if(err || !user) return res.status(400).send('User for removal not found based on email');

        user.remove(function(err){
            res.redirect('/users');
        });
    });
});

router.post('/:email', function(req, res, next) {
    if (!req.body.name || !req.body.email || !req.body.age) return res.status(400).send('Come on!');

    db.User.findOne({email: req.params.email}, function (err, user) {
        if(err || !user) return res.status(400).send('User for update not found based on email');

        user.name = req.body.name;
        user.email = req.body.email;
        user.age = req.body.age;
        user.agree = req.body.agree === 'on';

        if(req.body.comment){
            user.comments = req.body.comment;
        }

        user.save(function (err, user) {
            res.redirect('/users');
        });
    });
});

module.exports = router;
