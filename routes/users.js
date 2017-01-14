var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require(__dirname + '/../lib/db');


router.get('/', function(req, res, next) {
    db.User.find({}, function (err, users) {
        res.render('users', {
            users: users,
            __: moment,
            title: 'Add new user'
        });
    });
});

module.exports = router;
