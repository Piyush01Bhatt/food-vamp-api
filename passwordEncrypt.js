const encryptDecrypt = require("./encrypt-decrypt");
const MongoDbAdapter = require("./MongoDbAdapter");

module.exports = function(req, res, next) {
    const saltRounds = 6;
    const password = req.body.Password;
    const db = req.app.locals.db;

    encryptDecrypt.encrypt(password, saltRounds, function(hash) {

        // After encryption Storing Data In Temp Database
        var userData = {
            createdAt: new Date(),
            userName: req.body.Name,
            userPassword: hash,
            userEmail: req.body.Email
        };



        // Inserting Document to tempUser collection in FvTempDb
        MongoDbAdapter.insertDocument(req.app.locals.dbTemp, "tempUser", userData, function(result) {
            console.log(result.ops);
        });

    });
};