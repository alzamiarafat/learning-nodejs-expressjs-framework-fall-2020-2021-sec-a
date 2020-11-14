const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('user/create');
});

router.post('/create', (req, res)=>{

	var user_create = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		com_name: req.body.com_name,
		contact: req.body.contact
	};
	
	/*console.log(user_create);*/
	userModel.insert(user_create, function(status){
		
		if(status == false){
			res.redirect('/admin_home/userlist');

		}
		
	});
});


router.get('/edit/:username', (req, res)=>{

	var user = {username: req.params.username};
	userModel.getById(user, function(status){
		console.log(status);
		res.render('user/edit', {user_edit: status});
		
	});
});

router.post('/edit/:username', (req, res)=>{
	var user = {username: req.params.username};

	var user_update = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		com_name: req.body.company_name,
		contact: req.body.contact
	};

	userModel.update(user,user_update, function(status){
		//console.log(status);
		
		if(status == false){
			res.redirect('/admin_home/userlist');

		}
		
	});
});

router.get('/delete/:username', (req, res)=>{
	
	var user = {username: req.params.username};
	
	userModel.getById(user, function(status){
		res.render('user/delete', {user_delete: status});
		
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

router.get('/search', (req, res) => {
    res.render('user/search');
});

router.post('/search', (req, res) => {
    userModel.search(req.body.search, (result) => {
        res.json({
            results: result
        });
    });
});

module.exports = router;

