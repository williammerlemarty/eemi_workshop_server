/*
	Mission object
	by Xeewi
*/

function MissionObject(values){
	if ( typeof values.id === "number" ) { this.id = values.id; }
	if ( typeof values.party_id === "number" ) { this.party_id = values.party_id; }
	if ( typeof values.mission_id === "number" ) { this.mission_id = values.mission_id; }
	if ( typeof values.name === "string" ) { this.name = values.name; }
	if ( typeof values.desc === "string" ) { this.desc = values.desc; }
	if ( typeof values.time === "number" ) { this.time = values.time; }
		else { this.time = 10; }
	if ( typeof values.created === "string" ) { this.created = values.created; }
		else { var d = new Date(); this.created = d.toString(); }
	if ( typeof values.active === "boolean" ) { this.active = values.active; }
		else { this.active = false; }
	if ( typeof values.ended === "string" ) { this.ended = values.ended; }
	if ( typeof values.beacon_id === "string" ) { this.beacon_id = values.beacon_id; }
};

module.exports = MissionObject;