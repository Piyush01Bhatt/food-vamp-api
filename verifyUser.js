let mongoDbAdapter = require("./MongoDbAdapter");

module.exports = function(req, res, next) {
    mongoDbAdapter.findDocument(req.app.locals.db, "UserData", { userEmail: req.body.Email }, function(doc) {
        if (doc.error) {
            res.send(doc.message);
        } else {
            res.send(doc.message);
        }
    });
};