console.log('Hello, world!');

// importing dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const ads = [{ title: 'hello!' }];

var number = Math.floor((Math.random() * 100) + 1);

const myobj = { name: "Company Inc " + number, address: "Highway 37" + number };


app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', (req, res) => {

    //add entry
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

    //send results to browser
    res.send(myobj);
});

app.listen(3001, () => {
    console.log('lisening on port 3001');

});

