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

module.exports = router;