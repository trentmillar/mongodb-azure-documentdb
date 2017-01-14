require('dotenv').config();

var debug = require('debug')('mongodb-azure-documentdb:db');
var mongoose = require('mongoose');

mongoose.connection.on('error', debug);
mongoose.connection.on('open', function() {
    debug('Connection to MongoDb is open');
});

mongoose.connect(process.env.DB_CONNECTION);

var store = function() {
    var obj = {
        Schemas: {
            User: mongoose.Schema({
                name: String,
                email: { type: String, lowercase: true, index: true },
                age: { type: Number, min: 18, max: 65 },
                comments: { type: [String] },
                agree: Boolean,
                createdAt: { type: Date, default: Date.now }
            })
        }
    };
    obj.User = mongoose.model('User', obj.Schemas.User);

    obj.User.on('index', function(err){
       console.log('User index ' + err);
    });
    return obj;
};

module.exports = store();