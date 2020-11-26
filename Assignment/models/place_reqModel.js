const db = require('./db');

module.exports= {	

	insert: function(place_req, callback){
		var sql = "INSERT INTO place_reqst(scout_name, admin_name, country_name,place,history,about,travel_agency,cost,contact,status,action) VALUES ('"+place_req.sender+"', '"+place_req.recevier+"','"+place_req.country+"','"+place_req.place+"', '"+place_req.history+"','"+place_req.about+"','"+place_req.travel_agency+"', "+place_req.cost+","+place_req.contact+",'pending','add')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update:function(country_update, callback){
		var sql = "INSERT INTO place_reqst(scout_name, admin_name, country_name,place,history,about,travel_agency,cost,contact,status,action) VALUES ('"+country_update.scout_name+"', '"+country_update.admin_name+"','"+country_update.country+"','"+country_update.place+"', '"+country_update.history+"','"+country_update.about+"','"+country_update.travel_agency+"', "+country_update.cost+","+country_update.contact+",'pending','update')";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(results);
			}else{
				callback(false);
			}
		});

	},

	getById: function(country, callback){
		var sql = "select * from place_reqst WHERE place = '"+country.c_name+"'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(country, callback){
		var sql = "DELETE FROM `place_reqst` WHERE place = '"+country.c_name+"'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},


	count: function(user,callback){
		var sql = "SELECT * FROM `place_reqst` WHERE admin_name='"+user.name+"' and status='pending'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
	
}