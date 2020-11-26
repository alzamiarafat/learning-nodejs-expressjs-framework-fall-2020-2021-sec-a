const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const checklistModel = require.main.require('./models/checklistModel');
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

	countryModel.getAll(function(results){
		res.render('user_home/index', {uname: req.session.user, places: results});
	});

	/*res.render('user_home/index', {uname: req.cookies.uname });*/
	
});

router.get('/profile', (req, res)=>{

	var uname = req.session.user;
	
	userModel.getById(uname, function(results){
		res.render('user_home/profile', {profile: results});
	});

});

router.get('/profile/:username', (req, res)=>{

	var user = {username: req.params.username};
	userModel.getById(user, function(status){
		res.render('user_home/edit_profile', {user_edit: status});
		
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
			res.redirect('/user_home/profile');

		}
		
	});
});
router.get('/details/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	countryModel.getById(place, function(status){
		res.render('user_home/country_details', {details: status});
		
	});
	
});
router.get('/checklist', (req, res)=>{
	
	var user = req.session.user;
	
	checklistModel.getById(user, function(status){
		console.log(status);
		var list ={
			username: status[0].username,
			place: status[0].place
		}
		countryModel.checklist(list, function(results){
			res.render('user_home/checklist', {checklist: results});

		});
		
		
	});
	
});
router.get('/like/:place', (req, res)=>{
	
	var place = {
		place: req.params.place,
		username: req.session.user.username
	};
	
	checklistModel.insert(place, function(status){
		res.redirect('/user_home/checklist');
		
	});
	
});


module.exports = router;