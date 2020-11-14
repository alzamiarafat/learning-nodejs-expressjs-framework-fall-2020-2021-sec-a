const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	//var uname = req.cookies['uname'];
	res.render('home/employee_index', {uname: req.cookies.uname });
	//console.log(uname);
});

router.get('/job_list', (req, res)=>{
	/*var table = { table_name: 'job'};*/
/*console.log(table_name);*/
	userModel.getAll( function(results){

		//res.send(results);//console.log(results);
		res.render('home/job_list', {users: results});
	});

})
module.exports = router;