// Express
var express      = require('express');
var bodyParser   = require('body-parser');
var expressJwt   = require('express-jwt');

var config     = require("./config.js");
var authRoute  = require('./routes/auth.js');
var partyRoute = require('./routes/party.js');
var userModule = require('./modules/user/User.js');

// Environement config
process.env.NODE_ENV = config.ENV;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressJwt({ secret: config.SECRET }).unless({ path: [ '/auth' ]})); 

// auth Route, no token;
app.use('/auth', authRoute);

// User obj by token
app.use(function(req, res, next){
	if (typeof req.user !== "undefined") { 
		var User = new userModule();
		req.userObj = User.new(req.user);
		delete User;
	}
	next();
});

app.use('/party', partyRoute);

app.listen(8080);