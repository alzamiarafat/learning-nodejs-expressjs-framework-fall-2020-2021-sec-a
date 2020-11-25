const db = require('./db');

module.exports= {	

	insert: function(place_req, callback){
		var sql = "INSERT INTO place_reqst(scout_name, admin_name, country_name,place,history,about,travel_agency,cost,contact,status,action) VALUES ('"+place_req.sender+"', '"+place_req.recevier+"','"+place_req.country+"','"+place_req.place+"', '"+place_req.history+"','"+place_req.about+"','"+place_req.travel_agency+"', '"+place_req.cost+"','"+place_req.contact+"','"+place_req.status+"','"+place_req.action+"')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update:function(country,country_update, callback){
		var sql = "UPDATE `place_reqst` SET `scout_name`='"+country_update.scout_name+"',`admin_name`='"+country_update.admin_name+"',`country_name`='"+country_update.country+"',`place`='"+country_update.place+"',`history`='"+country_update.history+"',`about`='"+country_update.about+"',`travel_agency`='"+country_update.travel_agency+"',`cost`="+country_update.cost+",`contact`="+country_update.contact+",`status`='pending',`action`='update' WHERE  place='"+country.c_name+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(results);
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