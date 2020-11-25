const db = require('./db');

module.exports= {	

	insert: function(place_req, callback){
		var sql = "INSERT INTO place_reqst(scout_name, admin_name, country_name,place,history,about,travel_agency,cost,contact,status) VALUES ('"+place_req.sender+"', '"+place_req.recevier+"','"+place_req.country+"','"+place_req.place+"', '"+place_req.history+"','"+place_req.about+"','"+place_req.travel_agency+"', '"+place_req.cost+"','"+place_req.contact+"','pending')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
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