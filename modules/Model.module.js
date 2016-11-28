/*
	Model module, link to Database
	by DeskoverTeam
*/
var Promise = require('bluebird');

function Model(){
	this.config = require('../../config.js');
	this.mysql  = require('mysql');
	this.connection = this.mysql.createConnection(this.config.MYSQL);
};

Model.prototype.query = function(query, params){
	var model = this;
	return new Promise(function(resolve, reject){
		model.connection.query(query, params, function(err, rows, fields){
			if (err) reject(err);
			resolve(rows);
		});
	});
}


module.exports = Model;