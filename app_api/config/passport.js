var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(
    new LocalStrategy({
        usernameField: 'email'
    }, 
    function(username, password, done) {

        var cbError = function (error) {
            console.log('error while finding user by email');
            console.log(error);
            return done(err);
        };

        var cbSuccess = function (result) {
            console.log('Found user by email id');
            console.log(result);
            return done(null, result);
        };
        
        User
            .findOne({email: username})
            .then(cbSuccess, cbError);

    }) // end LocalStrategy
);