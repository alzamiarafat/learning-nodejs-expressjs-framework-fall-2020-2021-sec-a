const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();



router.get('/', (req, res)=>{
	//var uname = req.cookies['uname'];
	res.render('home/index');
	
});

module.exports = router;