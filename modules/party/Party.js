/*
	Party module
	by Xeewi
*/

var Promise = require('bluebird');
var Obj     = require('./Party.object.js');
var Service = require('./Party.service.js');

function Party(){

	// Create a party
	this.create = function(values){
		values.user_id = req.user.id;
		var party = new Obj(values);

		if ( typeof party.user_id !== "number" ||
			typeof party.name !== "string"
		) { reject({}); }
	};

	this.join = function(){};
	this.end = function(){};
};

Party.prototype.

module.exports = Party;