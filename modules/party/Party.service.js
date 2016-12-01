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
			reject({ok : false, err: "Param isn't a PartyObject"}); 
			return false; 
		}

		var query = "INSERT INTO ws_party ()";
		var params = [user.id];

	}); 
};

module.exports = PartyService;