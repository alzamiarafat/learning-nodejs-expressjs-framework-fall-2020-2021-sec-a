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
	res.render('home/admin_index', {uname: req.cookies.uname });
	
});

router.get('/userlist', (req, res)=>{
	
	userModel.getAll(function(results){
		res.render('home/userlist', {users: results});
	});

});

router.get('/profile', (req, res)=>{

	var uname = {username: req.cookies.uname };
	
	userModel.getById(uname, function(results){
		res.render('profile/admin_profile', {profile: results});
	});

});

module.exports = router;