/*
	Mission module
	by Xeewi
*/
var Promise = require('bluebird');
var Obj = require('./Mission.object.js');
var Service = require('./Mission.service.js');

function Mission(){
	this.create = function(values){
		return new Promise(function(resolve, reject){
			var mission = new Obj(values);

			if (typeof mission.mission_id !== "number") { reject({ ok : false, status : 400, err : "Wrong params" }); return false; }
			
			var service = new Service();

			service.insert(mission)
			.then(function(rows){
				mission = new Obj(rows.mission);
				resolve({ok: true, mission : mission});
			})
			.catch(function(err){ reject(err); });

			delete service;
		});
	};

	this.listByPartyId = function(party){
		return new Promise(function(resolve, reject){
			if (party.constructor.name != "PartyObject") { reject({ ok : false, status : 400, err : "Wrong params" }); return false; }
			var service = new Service();

			service.listByPartyId(party)
			.then(function(rows){
				var missions = [];
				for (var i = rows.missions.length - 1; i >= 0; i--) {
					missions.push(new Obj(rows.missions[i]));
				}
				resolve({ok : true, missions : missions});
			})
			.catch(function(err){ reject(err); });

			delete service;
		});
	}
};

module.exports = Mission;