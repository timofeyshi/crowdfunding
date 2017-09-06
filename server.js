const express = require('express');

const app = express();

const bodyParser = require('body-parser');


const mongoose = require('mongoose');

const dbConfig = require('./lib/config');

mongoose.Promise = global.Promise;
const db = mongoose.createConnection(dbConfig.url);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var routes = require('./routes/index')(db);

app.use('/', routes);


app.listen(3000);

