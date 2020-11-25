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
			req.session.user = {
                name 		: status[0].name,
                username  	: status[0].username,
                password  	: status[0].password,
                dob        	: status[0].dob,
                email     	: status[0].email,
                contact   	: status[0].contact,
                address   	: status[0].address,
                type 		: status[0].type
            };

		if(status[0].type == "admin"){
			res.redirect('/admin_home');
		}
		else if(status[0].type == "scout"){
			res.redirect('/scout_home');
		}
		else if(status[0].type == "user"){
			
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