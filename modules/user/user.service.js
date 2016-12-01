/*
	User service
	by Xeewi
*/
var Promise = require('bluebird');
var validator = require('validator');
var Model = require('../Model.js');
var config = require('../../config.js');

function UserService(){};

UserService.prototype.selectById = function(user){
	return new Promise(function(resolve, reject){
		if (user.constructor.name != "UserObject") { reject({err : 'not an UserObject'}); return false; }
		
		var query = "SELECT * FROM ws_user WHERE id = ?";
		var params = [user.id];
		
		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, user : rows[0] });
		}).catch(function(err){
			reject({ ok : false });
		});

		delete model;
	});
}

UserService.prototype.selectByUsername = function(user){
	return new Promise(function(resolve, reject){
		if (user.constructor.name != "UserObject") { reject({err : 'not an UserObject'}); return false; }
		
		var query = "SELECT * FROM ws_user WHERE username = ?";
		var params = [user.username];
		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ok : true, user : rows[0]});
		}).catch(function(err){
			reject({ ok : false });
		});

		delete model;
	});
}

UserService.prototype.insert = function(user){
	return new Promise(function(resolve, reject){
		
		if (user.constructor.name != "UserObject") { reject({err : 'not an UserObject'}); return false; }

		var query = "INSERT INTO ws_user (username, email, password) VALUES (?,?,?)";
		var params = [user.username, user.email, user.password];
		
		var model = new Model();

		model.query(query, params)
		.then(function(rows){ resolve( {ok: true, id: rows.insertedId } ); })
		.catch(function(err){ reject( {ok: false} ); });

		delete model;
	
	});
}



module.exports = UserService;