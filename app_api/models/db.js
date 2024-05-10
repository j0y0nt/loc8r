const { read } = require('fs');
var mongoose = require('mongoose');
var readLine = require("readline");

if (process.platform === "win32") {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}
//var dbURI = 'mongodb://localhost/Loc8r';
var dbURI = 'mongodb://locater:pwdpwd@127.0.0.1:27017/Loc8r';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI, {authSource: "admin"});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error:  ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose diconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected throught ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

// Import schema
require('./locations');
require('./users');