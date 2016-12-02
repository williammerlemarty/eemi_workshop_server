/*
	Beacon object
	by Xeewi
*/

function BeaconObject(values){
	
	if ( typeof values.id === "number" ) { this.id = values.id; }
	if ( typeof values.party_id === "number" ) { this.party_id = values.party_id; }
	if ( typeof values.major === "string" ) { this.major = values.major; }
	if ( typeof values.minor === "string" ) { this.minor = values.minor; }

};

module.exports = BeaconObject;