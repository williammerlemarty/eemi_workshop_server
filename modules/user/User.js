/*
	User module
	by Xeewi
*/
var Promise = require('bluebird');
var Obj = require('./User.object.js');
var Service = require('./User.service.js');
var bcrypt = require('bcrypt');
var config = require('../../config.js');

function User(){
	this.create = function(values){
		return new Promise(function(resolve, reject){

			var user = new Obj(values);

			if ( typeof user.username !== "string" || 
				typeof user.email !== 'string' ||
				typeof user.password !== 'string' ) { 
				reject({ok:false, status : 400, err : 'wrong parameters'}); return false;
			}

			bcrypt.genSalt(config.CRYPT.saltRound, function(err, salt) {
		    	bcrypt.hash(user.password, salt, function(err, hash) {
		    		var service = new Service();
		    		user.password = hash;
		    		service.insert(user)
		    		.then(function(res){
		    			delete user.password;
		    			user.id = res.id;
		    			resolve(user);
		    		})
		    		.catch(function(err){
		    			err.status = 403;
		    			err.msg = "User can't be created";
		    			reject(err);
		    		});
		    		delete service;
		    	});
		    }); 
		});
	};

	this.getById = function(values){
		return new Promise(function(resolve, reject){
			var user = new Obj(values);

			if (typeof user.id === 'undefined') { reject({ ok : false, status : 400, err : 'id not defined'}); return false; }

			var service = new Service();
			service.selectById(user)
			.then(function(rows){
				var finalUser = new Obj(rows.user);
				resolve(finalUser);
			})
			.catch(function(err){
		    	err.status = 403;
				err.msg = "User not found, id doesn't exist";
				reject(err);
			});

			delete user;
			delete service;
		});
	};

	this.getByUsername = function(values){
		return new Promise(function(resolve, reject){
			var user = new Obj(values);

			if (typeof user.username !== "string") { reject({ok: false,  status : 400, err : "username not defined"}); return false; }

			var service = new Service();
			service.selectByUsername(user)
			.then(function(rows){
				var finalUser = new Obj(rows.user);
				resolve(finalUser);
			})
			.catch(function(err){
				err.status = 403;
				err.msg = "User not found, username doesn't exist";
				reject(err);
			});
			delete user;
			delete service;
		});
	};

	this.new = function(values){

		return new Obj(values);
	};

	this.listByIds = function(values){
		return new Promise(function(resolve, reject){
			var usersTmp = [];
			for(var x in values){ usersTmp.push( new Obj( { id : values[x].user_id } ) ); }
			var service = new Service();

			service.listByIds(usersTmp)
			.then(function(rows){
				var users = [];
				for (var i = rows.users.length - 1; i >= 0; i--) {
					users.push( new Obj( rows.users[i] ) );
				}
				resolve({ok : true, users : users});
			})
			.catch(function(err){ reject(err); });

			delete service;
		});
	};

	this.listByPartyId = function(party){
		var self = this;
		return new Promise(function(resolve, reject){
			
			if ( party.constructor.name != "PartyObject" ) { reject({ok : false, status : 400, err : "not a PartyObject"}); }
			
			var service = new Service();

			service.listIdsByParty(party)
			.then(function(idRows){
				self.listByIds(idRows.party)
				.then(function(users){ 
					resolve(users); })
				.catch(function(err){ reject(err); });
			})
			.catch(function(err){ reject(err); });

			delete service;
		});
	};

	this.getByParty = function(party, user){
		var self = this;
		return new Promise(function(resolve, reject){
			
			if ( party.constructor.name != "PartyObject" ) { reject({ok : false, status : 400, err : "not a PartyObject"}); }
			
			var service = new Service();

			service.selectByParty(party, user)
			.then(function(idRows){
				self.getById({id : idRows.user.user_id})
				.then(function(user){ resolve({ok : true, user : user}); })
				.catch(function(err){ reject(err); });
			})
			.catch(function(err){ reject(err); });

			delete service;
		});		
	};
};

module.exports = User;