/*
	Party routes
	by Xeewi
*/

var express = require('express');
var schedule = require('node-schedule');

var router  = express.Router();
var jobs = [];

var PartyModule  = require('../modules/party/Party.js');
var BeaconModule = require('../modules/beacon/Beacon.js');
var MissionModule = require('../modules/mission/Mission.js');

/*
	'/party/'
	GET : Join a party
	POST : Create a party
*/
router.route('/')

	/* 	
		GET : Join a party
		params : {
			name : string,
			(optional) password : string  
		} 
	*/
	.get(function(req, res){
		var Party = new PartyModule();
		
		Party.join(req.query, req.userObj)
		.then(function(partyRow){ res.json({ok:true, party : partyRow.party}); })
		.catch(function(err){ res.json(err); });

		delete Party;
	})

	/* 	
		POST : Create a party
		params : {
			name : string,
			(optional) password : string,  
			(optional) players_limit : int,  
			(optional) time : int
		} 
	*/
	.post(function(req, res){
		var Party = new PartyModule();

		Party.create(req.body, req.userObj)
		.then(function(json){
			res.json(json);
		})
		.catch(function(err){
		
			res.json(err);
		});

		delete Party;
	});

/*
	'/party/beacons'
	POST : add beacons to a party
*/
router.route('/beacons')
	/* 	
		Add beacons to a party
		params : {
			party_id : int,
			major : string,
			minor : string
		} 
	*/
	.post(function(req, res){
		var Beacon = new BeaconModule();

		Beacon.create(req.body)
		.then(function(rows){
			var Party = new PartyModule();

			Party.completeById({id : req.body.party_id})
			.then(function(rows){ res.json(rows); })
			.catch(function(err){ res.status(err.status); res.json(err); });

			delete Party;
		})
		.catch(function(err){
			res.status(err.status);
			res.json(err);
		});

		delete Beacon;
	});

/*
	'/party/sync'
	GET : sync party object
*/
router.route('/sync')
	/* 	
		Sny party object
		params : {
			party_id : int
		} 
	*/
	.get(function(req, res){
		var Party = new PartyModule();
		Party.completeById(req.query)
		.then(function(rows){
			res.json(rows);
		})
		.catch(function(err){
			res.status(err.status);
			res.json(err);
		});

		delete Party;
	});

/*
	'/party/start'
	POST :  start party
*/
router.route('/start')
	/* 	
		Start party
		params : {
			party_id : int
		} 
	*/
	.get(function(req, res){
		var Party = new PartyModule();
		Party.start(req.query)
		.then(function(rows){
			var startTime = new Date( Date.now() );
			var endTime = new Date( Date.getTime() + ( rows.party.time * 10000 ) );
			var job = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/25 * * * * *' }, function(){
				var Mission = new MissionModule();
				delete Mission;
			});
			jobs[rows.party.id] = job;
			res.json(rows);
		})
		.catch(function(err){
			res.status(err.status);
			res.json(err);
		});

		delete Party;
	});
module.exports = router;