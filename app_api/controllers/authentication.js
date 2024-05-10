var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = async function (req, res) {

    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required."
        });
        return;
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    try {
        var result = await user.save();

        if (result) {
            var token;
            var token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            // Ouch. What happened here ?
            sendJSONresponse(res, 404, err);
        }
    } catch (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
    }

};

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields are required."
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;
        console.log(err);
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};