const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const place_reqModel = require.main.require('./models/place_reqModel');

const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	//var uname = req.cookies['uname'];
	res.render('scout_home/index', {uname: req.cookies.uname });
	
});

router.get('/profile', (req, res)=>{

	var uname = {username: req.cookies.uname };
	userModel.getById(uname, function(results){
		
		res.render('users_profile/profile', {profile: results});
	});

});

router.get('/profile/:username', (req, res)=>{

	var user = {username: req.params.username};
	userModel.getById(user, function(status){
		res.render('users_profile/edit_profile', {user_edit: status});
		
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

	res.render('scout_home/place_req', {uname: req.cookies.uname });
		
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
		contact: req.body.contact

	};
	place_reqModel.insert(place_req, function(status){

     console.log('done');
		
	});


	/*console.log(place_req);
	res.json({
            place_request: place_req
        });*/
		
});

module.exports = router;