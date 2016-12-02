/*
	User service (SQL)
	by Xeewi
*/
var Promise = require('bluebird');
var validator = require('validator');
var Model = require('../Model.js');
var config = require('../../config.js');

/* All user parameters are UserObject */
function UserService(){};

/*	Select an user by ID */
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

UserService.prototype.selectByParty = function(party, user){
	return new Promise(function(resolve, reject){
		if (user.constructor.name != "UserObject") { reject({err : 'not an UserObject'}); return false; }
		
		var query = "SELECT * FROM ws_party_users WHERE party_id = ? && user_id = ?";
		var params = [party.id, user.id];
		
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

/*	List users by IDs */
UserService.prototype.listByIds = function(users){
	return new Promise(function(resolve, reject){
		
		if (users[0].constructor.name != "UserObject") { reject({err : 'not UserObjects'}); return false; }

		var query = "SELECT * FROM ws_user WHERE ";
		var params = [];

		for (var i = users.length - 1; i >= 0; i--) {
			query += "id = ? ";
			params.push(users[i].id);
			if (i != 0) { query += "|| "; }
		}
		
		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, users : rows });
		}).catch(function(err){
			reject({ ok : false });
		});

		delete model;
	});
}

UserService.prototype.listIdsByParty = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "SELECT user_id FROM ws_party_users WHERE party_id = ? ";
		var params = [ party.id ];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, party : rows });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Party active id '" + party.id + "' cannot be found" });
		});

		delete model;

	}); 
};

/* Select an user by his username (unique) */
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

/* Insert an user */
UserService.prototype.insert = function(user){
	return new Promise(function(resolve, reject){
		
		if (user.constructor.name != "UserObject") { reject({err : 'not an UserObject'}); return false; }

		var query = "INSERT INTO ws_user (username, email, password) VALUES (?,?,?)";
		var params = [user.username, user.email, user.password];
		
		var model = new Model();

		model.query(query, params)
		.then(function(rows){ resolve( {ok: true, id: rows.insertId } ); })
		.catch(function(err){ reject( {ok: false} ); });

		delete model;
	
	});
}



module.exports = UserService;