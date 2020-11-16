const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const countryModel	= require.main.require('./models/countryModel');
const router 		= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});
router.get('/add_country', (req, res)=>{

	res.render('country/add_country', {uname: req.cookies.uname });

});

router.post('/add_country', (req, res)=>{

		
	var country = {
		username: req.body.username,
		customer_name: req.body.customer_name,
		country: req.body.country,
		history: req.body.history,
		about: req.body.about,
		trevel_agent: req.body.trevel_agent,
		cost: req.body.cost,
		contact: req.body.contact
	};

	countryModel.insert(country, function(status){
		res.redirect('/country_list');
	});


});

router.get('/country_list', (req, res)=>{
	
	countryModel.getAll(function(results){
		res.render('country/country_list', {countries: results});
	});

});

router.get('/details/:country', (req, res)=>{
	
	var country = {c_name: req.params.country};
	
	countryModel.getById(country, function(status){
		res.render('country/details', {details: status});
		
	});
	
});

router.get('/edit/:country', (req, res)=>{

	var country = {c_name: req.params.country};
	
	countryModel.getById(country, function(status){
		res.render('country/edit', {place_edit: status});
		
	});
});

router.post('/edit/:country', (req, res)=>{
	var country = {c_name: req.params.country};

	var country_update = {
		country: req.body.country,
		history: req.body.history,
		about: req.body.about,
		trevel_agent: req.body.trevel_agent,
		cost: req.body.cost,
		contact: req.body.contact
	};

	countryModel.update(country,country_update, function(status){
		console.log(status);
		
		if(status == false){
			res.redirect('/country/country_list');

		}
		
	});
});



/*router.get('/delete/:username', (req, res)=>{
	
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
});*/

module.exports = router;