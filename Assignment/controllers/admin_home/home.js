const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const place_reqModel = require.main.require('./models/place_reqModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.session.user == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	var user = req.session.user;
	place_reqModel.count(user,function(results){
		console.log(results.length);
		
		res.render('admin_home/index',{user: req.session.user, reqst: results.length});

	});
	
});
router.get('/profile', (req, res)=>{

	var uname = {username: req.cookies.uname };
	
	userModel.getById(uname, function(results){

		res.render('users_profile/profile', {profile: results});
	});

});

router.get('/profile/:username', (req, res)=>{

	var user = {username: req.cookies.uname };
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
			res.redirect('/admin_home/profile');

		}
		
	});
});

router.get('/userlist', (req, res)=>{
	
	userModel.getAll(function(results){
		console.log(results);
		res.render('admin_home/userlist', {users: results});
	});

});

router.get('/create', (req, res)=>{
	
		res.render('admin_home/create');


});

router.post('/create', (req, res)=>{
		
	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		dob: req.body.dob,
		type: req.body.type,
		address: req.body.address,
		contact: req.body.contact,
		email: req.body.email
	};

	userModel.insert(user, function(status){
		
		res.redirect('userlist');
	});


});

router.get('/delete/:username', (req, res)=>{
	
	var user = {username: req.params.username};
	
	userModel.getById(user, function(status){
		res.render('admin_home/delete', {user_delete: status});
		
	});
	
});

router.post('/delete/:username', (req, res)=>{
	var user = {username: req.params.username};
	userModel.delete(user, function(status){
		
		if(status == false){
			res.redirect('/admin_home/userlist');

		}
		
	});
});

router.get('/edit/:username', (req, res)=>{

	var user = {username: req.params.username};
	userModel.getById(user, function(status){
		console.log(status);
		res.render('admin_home/edit', {user_edit: status});
		
	});
});

router.post('/edit/:username', (req, res)=>{
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
			res.redirect('/admin_home/userlist');

		}
		
	});
});

module.exports = router;