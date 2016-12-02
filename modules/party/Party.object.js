/*
	Party object
	by Xeewi
*/

function PartyObject(values){
	
	if ( typeof values.id === "number" ) { this.id = values.id; }
	
	if ( typeof values.user_id === "number" ) { this.user_id = values.user_id; }
	
	if ( typeof values.name === "string" && values.name.length < 17 ) { this.name = values.name; }
	
	if ( typeof values.password === "string" ) { this.password = values.password; }
		else { this.password = ""; }
	
	if ( typeof values.players_limit === "number" ) { this.players_limit = values.players_limit; }
		else { this.players_limit = 3; }

	if ( typeof values.state === "number" ) { this.state = values.state; }
		else { this.state = 3; }

	if ( typeof values.time === "number" ) { this.time = values.time; }
		else { this.time = 10; }

	if ( typeof values.created === "string" ) { this.created = values.created; }
		else { d = new Date(); this.created = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2); }

	if ( typeof values.ended === "string" ) { this.ended = values.ended; }

	if ( typeof values.users === "object" ) { this.users = values.users; }
		else { this.users = []; }

	if ( typeof values.beacons === "object" ) { this.beacons = values.beacons; }
		else { this.beacons = []; }

	if ( typeof values.missions === "object" ) { this.missions = values.missions; }
		else { this.missions = []; }

};

module.exports = PartyObject;