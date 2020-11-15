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
	res.render('user_home/index', {uname: req.cookies.uname });
	
});

router.get('/profile', (req, res)=>{

	var uname = {username: req.cookies.uname };
	
	userModel.getById(uname, function(results){
		res.render('user_home/profile', {profile: results});
	});

});

module.exports = router;