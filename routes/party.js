/*
	Party routes
	by Xeewi
*/

var express = require('express');
var router  = express.Router();

var PartyModule = require('../modules/party/Party.js');

router.route('/')
// Join
.get(function(req, res){
	
})
// Create
.post(function(req, res){
	var Party = new PartyModule();

	Party.create(req.body, req.user)
	.then(function(json){
		res.json(json);
	})
	.catch(function(err){
		res.status(err.status);
		res.json(err);
	});

	delete Party;
});

router.route('/beacons')
// Add to party
.post(function(req, res){

});

module.exports = router;