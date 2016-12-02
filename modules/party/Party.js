/*
	Party module
	by Xeewi
*/

var Promise = require('bluebird');
var Obj     = require('./Party.object.js');
var Service = require('./Party.service.js');

var UserModule = require('../user/User.js');
var BeaconModule = require('../beacon/Beacon.js');
var MissionModule = require('../mission/Mission.js');

/*
	values parameters are object
	user parameters are UserObject
*/
function Party(){

	/*
		Party.create(values, user);

		object values : {
			name : string,
			(optional) password : string,
			(optional) players_limit : string
		}
	*/
	this.create = function(values, user){
		return new Promise(function(resolve, reject){
			values.user_id = user.id;
			var party = new Obj(values);

			if ( typeof party.user_id !== "number" ||
				typeof party.name !== "string"
			) { reject({ok: false, status : 400, err: "param name is missing or too long (16 char. max)"}); }

			var service = new Service();

			// Select party active by name to see if exist
			service.selectActiveByName(party)
			.then(function(rows){
				if (typeof rows.party !== "undefined") {
					reject({ok : false, status : 403, err : "Active party named '"+ party.name +"' already exist"});
				} else {
					// Create party
					service.insert(party)
					.then(function(rows){
						// Add user to party members
						service.insertUser(party, user)
						.then(function(rows){
							rows.ok = true;
							resolve(rows);
						})
						.catch(function(err){
							reject({ok : false, status : 403, err : "Party created but user can't join"});
						});
					})
					.catch(function(err){
						reject(err);
					});
				}
			})
			.catch(function(err){
				service.insert(party)
				.then(function(rows){
					// Add user to party members
					service.insertUser(party, user)
					.then(function(rows){
						rows.ok = true;
						resolve(rows);
					})
					.catch(function(err){
						reject({ok : false, status : 403, err : "Party created but user can't join"});
					});
				})
				.catch(function(err){
					reject(err);
				});
			});

			delete service;
		});
	};

	this.join = function(values, user){
		var self = this;
		return new Promise(function(resolve, reject){
			if (typeof values.name === "undefined" ) { reject({ok : false, status : 400, err: "Missing parameters name" }); return false; }

			var partyTmp = new Obj(values);

			var service = new Service();

			service.selectActiveByName(partyTmp)
			.then(function(rows){
				var partyId = new Obj( rows.party );

				self.completeById(partyId)
				.then(function(partyRow){
					party = partyRow.party;
					if (party.users.length < party.players_limit &&
						party.password == partyTmp.password ) {
						var User = new UserModule();

						User.getByParty(partyId, user)
						.then(function(rows){
							self.completeById(partyId)
							.then(function(party){ resolve(party); })
							.catch(function(err){ reject(err); });
						})
						.catch(function(err){
							service.insertUser( partyId, user)
							.then(function(rows){
								self.completeById(partyId)
								.then(function(party){ resolve(party); })
								.catch(function(err){ reject(err); });
							})
							.catch(function(err){ reject(err); });
						});

						delete User;
					} else {
						reject({ok : false, status : 403, err:"Party full or wrong password"});
					}
				})
				.catch(function(err){ reject(err); });				
			})
			.catch(function(err){ reject(err); });

			delete service;
		});
	};

	this.start = function(values, user){
		return new Promise(function(resolve, reject){
			var party = new Obj(values);
			if (typeof party.id === "undefined") { reject({ok : false, status : 400, err: "Missing id"}); return false; }
			var service = new Service();

			service.start(party)
			.then(function(rows){ resolve(rows); })
			.catch(function(err){ reject(err); });

			delete service;
		});
	};

	this.end = function(){};

	this.completeById = function(values){
		return new Promise(function(resolve, reject){
			var party = new Obj(values);
			if (typeof party.id === "undefied" ) { reject({ok : false, status : 400, err: "Missing parameters id" }); }
			
			var service = new Service();

			// Select active party by ID
			service.selectActiveById(party)
			.then(function(rowsParty){
				if (typeof rowsParty.party === "undefined") { 
					reject({ok : false, status : 403, err : "Party not exist"}); 
					return false; 
				}
				
				party = new Obj(rowsParty.party);

				// List users on the party				
				var User = new UserModule();

				User.listByPartyId(party)
				.then(function(rowsUsers){
					// Add users to party obj
					party.users = rowsUsers.users;

					// List beacons on the party
					var Beacon = new BeaconModule();

					Beacon.listByPartyId(party)
					.then(function(rows){
						// Add beacons to party object
						party.beacons = rows.beacons;
						// List missions
						var Mission = new MissionModule();

						Mission.listByPartyId(party)
						.then(function(rows){
							// Add missions to party object
							party.missions = rows.missions;

							resolve({ok : true, party: party});

						})
						.catch(function(err){ reject(err); });

						delete Mission;
					})
					.catch(function(err){ reject(err); });

					delete Beacon;
				})
				.catch(function(err){ reject(err); })

				delete User;
			})
			.catch(function(err){ reject(err); });

			delete service;
		});
	};
};

module.exports = Party;