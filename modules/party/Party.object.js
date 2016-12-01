/*
	Party object
	by Xeewi
*/

function PartyObject(values){
	
	if ( typeof values.id === "number" ) { this.id = values.id; }
	
	if ( typeof values.user_id === "number" ) { this.user_id = values.user_id; }
	
	if ( typeof values.name === "string" ) { this.name = values.name; }
	
	if ( typeof values.password === "string" ) { this.password = values.password; }
		else { this.password = ""; }
	
	if ( typeof values.player_limit === "number" ) { this.player_limit = values.player_limit; }
		else { this.player_limit = 3; }

	if ( typeof values.state === "number" ) { this.state = values.state; }
		else { this.state = 3; }

	if ( typeof values.time === "number" ) { this.time = values.time; }
		else { this.tine = 10; }

	if ( typeof values.created === "string" ) { this.created = values.created; }
		else { d = new Date(); this.created = d.toString(); }

	if ( typeof values.ended === "string" ) { this.ended = values.ended; }

	if ( typeof values.users === "object" ) { this.users = values.users; }
		else { this.users = {}; }

	if ( typeof values.beacons === "object" ) { this.beacons = values.beacons; }
		else { this.beacons = {}; }

	if ( typeof values.missions === "object" ) { this.missions = values.missions; }
		else { this.missions = {}; }

};

module.exports = PartyObject;