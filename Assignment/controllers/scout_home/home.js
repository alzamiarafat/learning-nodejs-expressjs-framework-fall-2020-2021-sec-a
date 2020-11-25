const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const place_reqModel = require.main.require('./models/place_reqModel');
const countryModel	= require.main.require('./models/countryModel');

const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.session.user == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	//var uname = req.cookies['uname'];
	res.render('scout_home/index', {uname: req.session.user });
	
});

router.get('/profile', (req, res)=>{

	var uname = {username: req.cookies.uname };
	userModel.getById(uname, function(results){
		
		res.render('scout_home/profile', {profile: results});
	});

});

router.get('/profile/:username', (req, res)=>{

	var user = {username: req.params.username};
	userModel.getById(user, function(status){
		res.render('scout_home/edit_profile', {user_edit: status});
		
	});

});

router.post('/profile/:username', (req, res)=>{
	var user = {username: req.params.username};

	var user_update = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		dob: req.body.dob,
		address: req.body.address,
		contact: req.body.contact,
		email: req.body.email

	};

	userModel.update(user,user_update, function(status){
		//console.log(status);
		
		if(status == false){
			res.redirect('/scout_home/profile');

		}
		
	});
});

router.get('/place_req', (req, res)=>{

	res.render('scout_home/place_req', {uname: req.session.user });
		
});
router.post('/place_req', (req, res)=>{

	var place_req = { 
		recevier: req.body.recevier,
		sender: req.body.username,
		country: req.body.country,
		history: req.body.history,
		about: req.body.about,
		travel_agency: req.body.travel_agency,
		cost: req.body.cost,
		contact: req.body.contact,

	};
	place_reqModel.insert(place_req, function(status){
		req.redirect('/scout_home');
	});
});
router.get('/place_list', (req, res)=>{

	countryModel.getAll(function(results){
		res.render('scout_home/country_list', {countries: results});
	});
		
});

router.get('/details/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	countryModel.getById(place, function(status){
		res.render('scout_home/country_details', {details: status});
		
	});
	
});

router.get('/edit/:place', (req, res)=>{

	var place = {c_name: req.params.place};
	
	countryModel.getById(place, function(status){
		res.render('scout_home/country_edit', {place_edit: status,user: req.session.user});
		
	});
});

router.post('/edit/:place', (req, res)=>{
	var place = {c_name: req.params.place};

	var country_update = {
		admin_name: req.body.recevier,
		scout_name: req.body.sender,
		country: req.body.country,
		place: req.body.place,
		history: req.body.history,
		about: req.body.about,
		travel_agency: req.body.travel_agency,
		cost: req.body.cost,
		contact: req.body.contact,
	};

	place_reqModel.update(place,country_update, function(status){
		console.log(status);
		
		if(status == false){
			res.redirect('/scout_home/place_list');

		}
		
	});
});


module.exports = router;