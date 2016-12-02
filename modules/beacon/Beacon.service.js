/*
	beacon service (SQL)
	by Xeewi
*/

var Promise = require('bluebird');
var Model   = require('../Model.js');

/* All beacon parameters are BeaconObject */
function BeaconService(){}

/*	Insert a new beacon into a party */
BeaconService.prototype.insert = function(beacon){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( beacon.constructor.name != "BeaconObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a BeaconObject"}); 
			return false; 
		}

		console.log(beacon);

		var query = "INSERT INTO ws_party_beacons (party_id, major, minor) VALUES (?,?,?) ";
		var params = [
			beacon.party_id,
			beacon.major,
			beacon.minor
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			beacon.id = rows.insertId;
			resolve({ ok : true, beacon : beacon });
		}).catch(function(err){
			console.log(err);
			reject({ ok : false, status : "403", err: "Beacon cannot be created" });
		});

		delete model;

	}); 
};

BeaconService.prototype.listByPartyId = function(party){ 
	return new Promise(function(resolve, reject){
		
		// Param test
		if ( party.constructor.name != "PartyObject" ) { 
			reject({ok : false, status : 400, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "SELECT * FROM ws_party_beacons WHERE party_id = ?";
		var params = [
			party.id
		];

		var model = new Model();

		model.query(query, params)
		.then(function(rows){
			resolve({ ok : true, beacons : rows });
		}).catch(function(err){
			reject({ ok : false, status : "403", err: "Beacon cannot be created" });
		});

		delete model;

	}); 
};

module.exports = BeaconService;