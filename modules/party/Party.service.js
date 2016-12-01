/*
	Party object
	by Xeewi
*/

var Promise = require('bluebird');
var Obj     = require('./Party.object.js');
var Model   = require('../Model.js');

function PartyService(){}

PartyService.prototype.insert = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "INSERT INTO ws_party (user_id, name, password, players_limit, state, time, created) VALUES (?,?,?,?,?,?,?)";
		var params = [
			party.user_id, 
			party.name,
			party.password,
			party.players_limit,
			party.state,
			party.time,
			party.created
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			party.id = rows.insertedId;
			resolve({ ok : true, party : party });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Party cannot be created" });
		});

		delete model;

	}); 
};

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
			resolve({ ok : true, party : rows });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Party active named '" + party.name + "' cannot be found" });
		});

		delete model;

	}); 
};

module.exports = PartyService;