/*
	User object
	by Xeewi
*/
var validator = require('validator');

function UserObject(values){
	if ( typeof values.id === "number" ){ this.id = values.id; }
	if ( typeof values.username === "string" ) { this.username = values.username; }
	if ( typeof values.password === "string" ) { this.password = values.password; }
	if ( validator.isEmail( values.email + '' ) ) { this.email = values.email; }
};

module.exports = UserObject;