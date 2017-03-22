exports.insertDocument = function(db, collection, doc, callback) {
    db.collection(collection).insertOne(doc, (err, result) => {
        if (err) {
            return console.log("Error in inserting document : " + err);
        }

        console.log("Inserted a document to collection : " + collection);
        callback(result);
    });
};

exports.findDocument = function(db, collection, query, callback) {
    db.collection(collection).findOne(query, (err, doc) => {
        if (err) {
            return console.log(err);
        }
        console.log(doc);
        if (doc) {
            callback({ error: 0, message: doc });
        } else {
            callback({ error: 1, message: "User not found" });
        }

    });
};