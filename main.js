// Express
var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var expressJwt   = require('express-jwt');

var config     = require("./config.js");
var authRoute  = require('./routes/auth.js');
var partyRoute = require('./routes/party.js');

// Environement config
process.env.NODE_ENV = config.ENV;

var app = express();

app.use(expressJwt({ secret: config.SECRET }).unless({ path: [ '/auth' ]})); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/party', partyRoute);

app.listen(8080);