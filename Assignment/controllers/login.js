const express 		= require('express');
const { check, validationResult } = require('express-validator');
const userModel		= require.main.require('./models/userModel');

const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index', { username : null, password : null, length: null, error: null});
});

router.post('/', 
[
	// check by express-validator
	check('username').not().isEmpty().trim().escape().withMessage('username require'),
	check('password').not().isEmpty().trim().escape().withMessage('password require')
], 
(req, res)=>{
	const error = validationResult(req);
        if(!error.isEmpty()){
            res.render('login/index', { username : error.array()[0], password : error.array()[1],length: null,error: null});
        } else {
			var user = {
				username: req.body.username,
				password: req.body.password
			};
		
				userModel.validate(user, function(status){
					if(status == false){
						res.render('login/index',{length: status,error: 'username and password wrong', username : null, password : null});
					} else{
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
							res.redirect('/user_home');
						}

					}		
					
				});

		}
	
}); 


module.exports = router;