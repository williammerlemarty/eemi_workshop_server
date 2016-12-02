/*
	Party service (SQL)
	by Xeewi
*/

var Promise = require('bluebird');
var Model   = require('../Model.js');

/* All party parameters are PartyObject */
function PartyService(){}

/*	Insert a new party
	!! it dont add user into the party members
	!! call insertUser() after to do it */
PartyService.prototype.insert = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "INSERT INTO ws_party (user_id, name, password, players_limit, state, time, created) VALUES (?,?,?,?,?,?, NOW())";
		var params = [
			party.user_id, 
			party.name,
			party.password,
			party.players_limit,
			party.state,
			party.time
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			party.id = rows.insertId;
			resolve({ ok : true, party : party });
		}).catch(function(err){
			console.log(err);
			reject({ ok : false, status : "403", err: "Party cannot be created" });
		});

		delete model;

	}); 
};

/*	Insert user into a party
	Need a complete PartyObject & UserObject */
PartyService.prototype.insertUser = function(party, user){
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param party isn't a PartyObject"}); 
			return false; 
		}

		if ( user.constructor.name != "UserObject" ) { 
			reject({ok : false, status : 400, err: "Param user isn't a PartyObject"}); 
			return false; 
		}
		console.log(user);
		// query
		var query = "INSERT INTO ws_party_users (party_id, user_id, connected) VALUES (?,?,TRUE)";
		var params = [party.id, user.id];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			party.users.push(user);
			resolve({ ok : true, party : party });
		}).catch(function(err){
			console.log(err);
			reject({ ok : false, status : "403", err: "User cannot be added to party" });
		});

		delete model;

	}); 
};

/* 	Select an active party by its name 
	Also can be use to check if already exist */
PartyService.prototype.selectActiveByName = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "SELECT id FROM ws_party WHERE name = ? && ended IS NULL";
		var params = [ party.name ];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			if (rows.length < 1) { reject({ok : false, status : 403, err : "party cannot be found"}); }
			else { resolve({ ok : true, party : rows[0] }); }
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Party active named '" + party.name + "' cannot be found" });
		});

		delete model;

	}); 
};

/* 	Select an active party by its id 
	Also can be use to check if already exist */
PartyService.prototype.selectActiveById = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "SELECT * FROM ws_party WHERE id = ? && ended IS NULL";
		var params = [ party.id ];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, party : rows[0] });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Party active id '" + party.id + "' cannot be found" });
		});

		delete model;

	}); 
};

PartyService.prototype.updateStart = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "UPDATE ws_party SET started=NOW() WHERE id = ?";
		var params = [ party.id ];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true});
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Cannot start party" });
		});

		delete model;

	}); 
};


module.exports = PartyService;