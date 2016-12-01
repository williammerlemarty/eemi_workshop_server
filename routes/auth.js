/*
	Auth Route
	by Xeewi
*/

var express   = require('express');
var jwt       = require('jsonwebtoken');
var config    = require('../config.js');
var bcrypt    = require('bcrypt');
var validator = require('validator');

var userModule = require('../modules/user/User.js');

var router = express.Router();

router.route('/')
// Login
.get(function(req, res){
	var User = new userModule();

	User.getByUsername(req.query)
	.then(function(user){
		bcrypt.compare(req.query.password, user.password, function(err, resp) {
			if (resp == true) {
				delete user.password;
				var token = jwt.sign(user, config.SECRET );
				user.token = token;
				res.json({ok : true, user : user});
			} else {
				res.json({ok : false, err : "Wrong password"})
			}
		});
	})
	.catch(function(err){
		err.ok = false;
		res.status(err.status);
		res.json(err);
	});
	delete User;
})
// Sign up
.post(function(req, res){
	var User = new userModule();

	User.create(req.body)
	.then(function(user){
		var token = jwt.sign(user, config.SECRET );
		user.token = token;
		res.json({ok : true, user : user});
	})
	.catch(function(err){
		err.ok = false;
		res.status(err.status);
		res.json(err);
	});

	delete User;
})
// Logout
.delete(function(req, res){
	
});

module.exports = router;