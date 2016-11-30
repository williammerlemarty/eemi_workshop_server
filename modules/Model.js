/*
	Model module, link to Database
	by Xeewi
*/
var Promise = require('bluebird');
var mysql  = require('mysql');
var config = require('../config.js');

function Model(){
	this.connection = mysql.createConnection(config.MYSQL);
	this.query = function(query, params){
		var self = this;
		return new Promise(function(resolve, reject){
			self.connection.connect();
			self.connection.query(query, params, function(err, rows, fields){
				if (err) reject(err);
				resolve(rows);
			});
			self.connection.end();
		});
	};
};

module.exports = Model;