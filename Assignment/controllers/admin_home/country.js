const express 		= require('express');
const countryModel	= require.main.require('./models/countryModel');
const place_reqModel = require.main.require('./models/place_reqModel');

const router 		= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.session.user == null){
		res.redirect('/login');
	}else{
		next();
	}
});
router.get('/add_country', (req, res)=>{

	res.render('country/add_country', {uname: req.session.user });

});

router.post('/add_country', (req, res)=>{

		
	var country = {
		username: req.body.username,
		country: req.body.country,
		place: req.body.place,
		history: req.body.history,
		about: req.body.about,
		travel_agency: req.body.travel_agency,
		cost: req.body.cost,
		contact: req.body.contact
	};

	countryModel.insert(country, function(status){
		console.log(status);
		res.redirect('/country/country_list');
	});


});

router.get('/country_list', (req, res)=>{
	
	countryModel.getAll(function(results){
		res.render('country/country_list', {countries: results});
	});

});

router.get('/details/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	countryModel.getById(place, function(status){
		res.render('country/details', {details: status});
		
	});
	
});

router.get('/notification/details/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	place_reqModel.getById(place, function(status){
		res.render('country/details', {details: status});
		
	});
	
});

router.get('/notification_add/accept/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	place_reqModel.getById(place, function(status){
		var place_add = {
			username: 		req.session.user.username,
			country: 		status[0].country_name,
			place: 			status[0].place,
			history: 		status[0].history,
			about: 			status[0].about,
			travel_agency: 	status[0].travel_agency,
			cost: 			status[0].cost,
			contact: 		status[0].contact
			
		}
		countryModel.insert(place_add,function(results){
			if (results == false) {
				place_reqModel.delete(place,function(place_rqst_delele){
					res.redirect('/admin_home/notification');
	
				});
				
			}
			
		});
		
	});
	
});


router.get('/notification_edit/accept/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	place_reqModel.getById(place, function(status){
		var place_update = {
			username: 		req.session.user.username,
			country: 		status[0].country_name,
			place: 			status[0].place,
			history: 		status[0].history,
			about: 			status[0].about,
			travel_agency: 	status[0].travel_agency,
			cost: 			status[0].cost,
			contact: 		status[0].contact
			
		}
		countryModel.update(place,place_update,function(results){
			console.log(results);
			if (results == false) {
				place_reqModel.delete(place,function(place_rqst_delele){
					res.redirect('/country/country_list');
	
				});
				
			}
			
		});
		
	});
	
});
router.get('/notification/cancel/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	
				place_reqModel.delete(place,function(place_rqst_delele){
					res.redirect('/admin_home/notification');
	
				});
				
			
			
	
	
});




router.get('/edit/:place', (req, res)=>{

	var place = {c_name: req.params.place};
	
	countryModel.getById(place, function(status){
		res.render('country/edit', {place_edit: status});
		
	});
});

router.post('/edit/:place', (req, res)=>{
	var place = {c_name: req.params.place};

	var country_update = {
		country: req.body.country,
		place: req.body.place,
		history: req.body.history,
		about: req.body.about,
		travel_agency: req.body.travel_agency,
		cost: req.body.cost,
		contact: req.body.contact
	};

	countryModel.update(place,country_update, function(status){
		
		if(status == false){
			res.redirect('/country/country_list');

		}
		
	});
});


router.get('/delete/:place', (req, res)=>{
	
	var place = {c_name: req.params.place};
	
	countryModel.getById(place, function(status){
	
		res.render('country/delete', {place_delete: status});
		
	});
	
});

router.post('/delete/:place', (req, res)=>{
	var place = {place: req.params.place};
	countryModel.delete(place, function(status){
		
		if(status == false){
			res.redirect('/country/country_list');

		}
		
	});
});

module.exports = router;