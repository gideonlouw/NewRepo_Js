console.log('Hello, world!');

// importing dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const ads = [{ title: 'hello!' }];

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

//mongodb call    
const { startDatabase } = require('./database/mongo');
const { insertAd, getAds } = require('./database/ads');
app.get('/', async (req, res) => {
    res.send(await getAds());
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertAd({ title: 'Hello, now from the in-memory database!' });

    // start the server
    app.listen(3001, async () => {
        console.log('listening on port 3001');
    });
});