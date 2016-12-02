/*
	Party object
	by Xeewi
*/

function PartyObject(values){

	if ( typeof values.id !== "undefined" ) { this.id = values.id; }

	if ( typeof values.user_id !== "undefined" ) { this.user_id = values.user_id; }
	
	if ( typeof values.name !== "undefined" && values.name.length < 17 ) { this.name = values.name; }
	
	if ( typeof values.password !== "undefined" ) { this.password = values.password; }
		else { this.password = ""; }
	
	if ( typeof values.players_limit !== "undefined" ) { this.players_limit = values.players_limit; }
		else { this.players_limit = 3; }

	if ( typeof values.state !== "undefined" ) { this.state = values.state; }
		else { this.state = 3; }

	if ( typeof values.time !== "undefined" ) { this.time = values.time; }
		else { this.time = 10; }

	if ( typeof values.created !== "undefined" ) { this.created = values.created; }
		else { d = new Date(); this.created = d.toString(); }

	if ( typeof values.ended !== "undefined" ) { this.ended = values.ended; }

	if ( typeof values.users !== "undefined" ) { this.users = values.users; }
		else { this.users = []; }

	if ( typeof values.beacons !== "undefined" ) { this.beacons = values.beacons; }
		else { this.beacons = []; }

	if ( typeof values.missions !== "undefined" ) { this.missions = values.missions; }
		else { this.missions = []; }

};

module.exports = PartyObject;