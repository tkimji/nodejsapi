module.exports = function(app, db) {

    app.get('/api/agent/test', (req, res) => { // You'll create your note here.   

        var data = {}
        data.id = "test";
        res.status(200).json(data);
    });


    app.get('/api/agent/All', (req, res) => { // You'll create your note here.   


        db.executeSql('select top(10) ascode,asname,assname from [tagent]', function(err, recordset) {

            var result = {}
            result.data = recordset.recordset;
            result.rows = recordset.rowsAffected;
            console.log(err)
                // send records as a response
            res.status(200).json(result);

        });
    });

    app.post('/api/agent/Search', (req, res) => {
        var param = [];
        param.push({
            "name": "text",
            "value": req.body.text
        });



        db.executeStore('sp_tagent_search', param, function(err, recordset) {

            if (err) res.status(404).send(err);

            console.log(recordset)
                // send records as a response
            res.send(recordset);


        });

    });



};