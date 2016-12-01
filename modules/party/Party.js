/*
	Party module
	by Xeewi
*/

var Promise = require('bluebird');
var Obj     = require('./Party.object.js');
var Service = require('./Party.service.js');

function Party(){

	// Create a party
	this.create = function(values, user){
		return new Promise(function(resolve, reject){
			values.user_id = user.id;
			var party = new Obj(values);

			if ( typeof party.user_id !== "number" ||
				typeof party.name !== "string"
			) { reject({ok: false, status : 400, err: "param name is mandatory"}); }

			var service = new Service();

			// Select party active by name to see if exist
			service.selectActiveByName(party)
			.then(function(rows){
				if (rows.party.length > 0) {
					reject({ok : false, status : 403, err : "Active party named '"+ party.name +"' already exist"});
				} else {
					service.insert(party)
					.then(function(rows){
						rows.ok = true;
						resolve(rows)
					})
					.catch(function(err){
						reject(err);
					});
				}
			})
			.catch(function(err){
				reject(err);
			});

			delete service;
		});
	};

	this.join = function(){};
	
	this.end = function(){};
};

module.exports = Party;