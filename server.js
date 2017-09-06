const express = require('express');

const app = express();
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');

const dbConfig = require('./lib/config');

mongoose.Promise = global.Promise;
const db = mongoose.createConnection(dbConfig.url);




app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({
	secret: 'mySecretKey',
	resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());


var initPassport = require('./passport/init');
initPassport(passport,db);

var routes = require('./routes/index')(passport,db);

app.use('/', routes);


app.listen(3000);

