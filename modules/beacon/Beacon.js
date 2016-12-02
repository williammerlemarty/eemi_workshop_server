/*
	Beacon module
	by Xeewi
*/

var Promise = require('bluebird');
var Obj     = require('./Beacon.object.js');
var Service = require('./Beacon.service.js');

/*
	values parameters are object
*/
function Beacon(){

	/*
		Beacon.create(values, user);

		object values : {
			party_id : int,
			major : string,
			minor : string,
			(optional) id : int 
		}
	*/
	this.create = function(values){
		return new Promise(function(resolve, reject){
			var beacon = new Obj(values);
			
			var service = new Service();

			service.insert(beacon)
			.then(function(rows){ resolve(rows); })
			.catch(function(err){ reject(err); });

			delete service;
		});
	};

	this.listByPartyId = function(party){
		return new Promise(function(resolve, reject){
			
			var service = new Service();

			service.listByPartyId(party)
			.then(function(rows){
				var beacons = [];
				for(var x in rows.beacons){
					beacons.push( new Obj(rows.beacons[x]) );
				}
				resolve({ok : true, beacons : beacons});
			})
			.catch(function(err){ reject(err); });

			delete service;
		});	
	};
};

module.exports = Beacon;