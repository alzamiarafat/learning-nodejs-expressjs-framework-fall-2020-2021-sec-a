const express 		= require('express');
const userModel		= require.main.require('./models/userModel');

const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{


	var user = {
		username: req.body.username,
		password: req.body.password
	};

		userModel.validate(user, function(status){
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
			
			/*countryModel.getAll(function(results){
				res.redirect('/user_home', {countries: results});
			});*/
			res.redirect('/user_home');
		}

		else{
			res.redirect('/login');
		}
	});
	
}); 

module.exports = router;