const db = require("mssql")
const config = require('../config/production.json');

function connect(dbconfig) {

    db.connect(dbconfig, function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return db;
}





module.exports.connect = function(dbconfig) {
    console.log(dbconfig)
    db.connect(dbconfig, function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return db;
}


module.exports.executeSql = function(sql, callback) {

    db.connect(config.dbconfig, function(err) {

        if (err) console.log(err);

        // create Request object
        var request = new db.Request();

        // query to the database and get the records

        request.query(sql, function(err, recordset) {

            if (err) console.log(err)

            // send records as a response
            callback(null, recordset);

        });


    });


    console.log("Connected!");



    /* conn.connect()
    .then(function() {
        var req = new sqlDb(conn);
        req.query(sql)
            .then(function(recordset) {
                callback(recordset);
            })
            .catch(function(err) {
                console.log(err);
                callback(null, err);
            });
    })
    .catch(function(err) {
        console.log(err);
        callback(null, err);
    });*/
}


module.exports.executeStore = function(storename, parameters, callback) {

    db.connect(config.dbconfig, function(err) {

        if (err) console.log(err);

        // create Request object
        var request = new db.Request();

        if (parameters != null) {
            parameters.forEach(param => {
                if (param.output) {
                    if (param.type == "int") {
                        request.output(param.name, db.Int, param.value);

                    } else
                        request.output(param.name, param.value);
                } else {
                    request.input(param.name, param.value);
                }
            });
        }

        request.execute(storename).then(function(results) {
            //  console.log(results)
            callback(null, results);
        }).catch(function(err) {
            callback(err)
            console.log(err);
        });

    });




    /* conn.connect()
    .then(function() {
        var req = new sqlDb(conn);
        req.query(sql)
            .then(function(recordset) {
                callback(recordset);
            })
            .catch(function(err) {
                console.log(err);
                callback(null, err);
            });
    })
    .catch(function(err) {
        console.log(err);
        callback(null, err);
    });*/
}