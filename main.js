// Express
var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var authRoute    = require('./routes/auth.js');
var expressJwt = require('express-jwt');  
var config = require("./config.js");

// Environement config
process.env.NODE_ENV = config.ENV;

var app = express();

app.use(expressJwt({ secret: config.SECRET }).unless({ path: [ '/auth' ]})); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoute);

app.listen(8080);