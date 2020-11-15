const express 	= require('express');
const userModel = require.main.require('./models/userModel');
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

module.exports = router;