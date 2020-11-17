const db = require('./db');

module.exports= {	

	insert: function(place_req, callback){
		var sql = "INSERT INTO place_reqst(sender, receiver, place) VALUES ('"+place_req.sender+"', '"+place_req.recevier+"','"+place_req.country+"')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	count: function(callback){
		var sql = "SELECT COUNT(place) FROM place_reqst";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
	
}