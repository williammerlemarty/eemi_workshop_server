/*
	mission service (SQL)
	by Xeewi
*/

var Promise = require('bluebird');
var Model   = require('../Model.js');

/* All mission parameters are MissionObject */
function MissionService(){}

/*	Insert a new mission into a party */
MissionService.prototype.insert = function(mission){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( mission.constructor.name != "MissionObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a MissionObject"}); 
			return false; 
		}

		var query = "INSERT INTO ws_party_missions(party_id, mission_id, time, created, active, beacon_id) VALUES (?,?,?,?,?,?)";
		var params = [
			mission.party_id,
			mission.mission_id,
			mission.time,
			mission.created,
			mission.active,
			mission.beacon_id,
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			mission.id = rows.insertId;
			resolve({ ok : true, mission : mission });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "mission cannot be created" });
		});

		delete model;

	}); 
};

MissionService.prototype.selectDetails = function(mission){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( mission.constructor.name != "MissionObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a MissionObject"}); 
			return false; 
		}

		var query = "SELECT * FROM ws_mission WHERE id = ?";
		var params = [
			mission.mission_id
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, mission : rows });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "mission cannot be selected" });
		});

		delete model;

	}); 
};

MissionService.prototype.listByPartyId = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a MissionObject"}); 
			return false; 
		}

		var query = "SELECT *, (SELECT name FROM ws_mission WHERE id = ws_party_missions.mission_id) as name, (SELECT descp FROM ws_mission WHERE id = ws_party_missions.mission_id) as descp FROM ws_party_missions WHERE party_id = ?";
		var params = [
			party.id
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, missions : rows });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "mission cannot be listed by party_id" });
		});

		delete model;

	}); 
};

module.exports = MissionService;