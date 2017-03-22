const bcrypt = require("bcrypt");

exports.encrypt = function(text, saltRounds, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            return console.log("Error in generating salt : " + err);
        }

        bcrypt.hash(text, salt, function(err, hash) {
            if (err) {
                return console.log("Error in generating hash : " + err);
            }
            callback(hash);
        });
    });
};