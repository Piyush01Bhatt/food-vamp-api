const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongodb = require("mongodb");
const encryptPassword = require("./passwordEncrypt");
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const verifyUser = require('./verifyUser')

const mongourlTemp = "mongodb://localhost:27017/FvTempDb";
const mongourl = "mongodb://localhost:27017/FvDb";

let app = express();

MongoClient.connect(mongourlTemp, (err, db) => {
    if (err) throw err;

    db.collection('tempUser').createIndex({ "createdAt": 1 }, { expireAfterSeconds: 120 });
    app.locals.dbTemp = db;
});

MongoClient.connect(mongourl, (err, db) => {
    if (err) throw err;

    app.locals.db = db;
});

//Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let verifyPassword = function(req, res, next) {
    let password = req.body.Password;
    let ar = password.split(/[,$#@!*&%?+-0-9]+/);
    var l = 0;
    for (i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
            l = 1;
            break;
        }
    }
    if (password.length > 8 && ar.length > 0 && l == 1) {
        res.send("passwordOk");
        next();
    } else {
        res.send("passwordInvalid");
    }
};


app.post("/register_data", verifyPassword, encryptPassword);

app.post('/login', verifyUser);

app.listen(3400, function() {
    console.log("Server running on port 3400");
});