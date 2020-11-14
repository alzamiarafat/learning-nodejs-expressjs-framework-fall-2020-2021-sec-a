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
	res.render('job/create');
});

router.post('/create', (req, res)=>{

	var job_create = {
		com_name: req.body.com_name,
		job_title: req.body.job_title,
		job_loc: req.body.job_loc,
		salary: req.body.salary
	};
	var uname = {username: req.cookies['uname']};
	console.log(job_create);
	console.log(uname);

	userModel.insert_job(uname,job_create, function(status){
		console.log(status);
		
		if(status == false){
			res.redirect('/employee_home');

		}
		
	});
});

router.get('/edit/:username', (req, res)=>{

	var user = {username: req.params.username};
	userModel.getById(user, function(status){
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
			res.redirect('/employee_home/userlist');

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

module.exports = router;

