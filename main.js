// Environement config
process.env.NODE_ENV = config.ENV;

// Express
var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var authRoute    = requrie('./routes/auth.js');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoute);

app.listen(8080);