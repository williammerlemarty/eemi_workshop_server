/* 
	RequestBluebird 
	by Deskover Team
*/

var request = require('request');
var Promise = require('bluebird');

function request_bluebird(){

	/* var params = {
		url : STRING,
		auth : {
			bearer : STRING (token)
			// OR
			user : STRING,
			password :  STRING,
			sendImmediately : BOOLEAN
		},
		form : {}
	} */

	function set_params(values){
		var final_param = { url : null, param : {} };
		if (!values || typeof(values) != "object") { return  new Error(" values parameter not an object or undefined" );  }
		if (!values.url || typeof(values.url) != "string") { return new Error( "values.url not a string or undefined" );  }
		if (values.auth) { final_param.param.auth = values.auth; }
		if (values.form) { final_param.param.form = values.form; }
		final_param.url = values.url;
		return final_param;
	};

	this.get = function(values){
		return new Promise(function(resolve, reject){
			var params = set_params(values);

			request.get(params.url, params.param, function(err, response, body){
				if (err) { reject(err); return }
				resolve({
					status : response.statusCode,
					body : JSON.parse(body)
				});
			});
		});
	};

	this.post = function(values){
		return new Promise(function(resolve, reject){
			var params = set_params(values);

			request.post(params.url, params.param, function(err, response, body){
				if (err) { reject(err); return }
				resolve({
					status : response.statusCode,
					body : JSON.parse(body)
				});
			});
		});
	};

	this.put = function(values){
		return new Promise(function(resolve, reject){
			var params = set_params(values);

			request.put(params.url, params.param, function(err, response, body){
				if (err) { reject(err); return }
				resolve({
					status : response.statusCode,
					body : JSON.parse(body)
				});
			});
		});
	};

	this.patch = function(values){
		return new Promise(function(resolve, reject){
			var params = set_params(values);

			request.patch(params.url, params.param, function(err, response, body){
				if (err) { reject(err); return }
				resolve({
					status : response.statusCode,
					body : JSON.parse(body)
				});
			});
		});
	};

	this.delete = function(values){
		return new Promise(function(resolve, reject){
			var params = set_params(values);

			request.delete(params.url, params.param, function(err, response, body){
				if (err) { reject(err); return }
				resolve({
					status : response.statusCode,
					body : JSON.parse(body)
				});
			});
		});
	};
}

module.exports = request_bluebird;