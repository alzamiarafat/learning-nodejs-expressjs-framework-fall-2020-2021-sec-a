const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('register/index');
});

router.post('/', (req, res)=>{


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
	/*console.log(user);*/
	userModel.insert(user, function(status){
		/*console.log('status');*/
		var success = {
			msg: "Registration is Complete."
		};
		var myJSON = JSON.stringify(success);
		console.log(myJSON);
		res.redirect('/login');
	});
	

		/*userModel.validate(user, function(status){
		if(status == "admin"){
			res.cookie('uname', req.body.username);
			res.redirect('/admin_home');
		}
		else if(status == "scout"){
			res.cookie('uname', req.body.username);
			res.redirect('/scout_home');
		}
		else if(status == "user"){
			res.cookie('uname', req.body.username);
			res.redirect('/user_home');
		}

		else{
			res.redirect('/login');
		}
	});*/
	
}); 
module.exports = router;