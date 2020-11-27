const db = require('./db');

module.exports= {	
	getAll: function(callback){
		var sql = "select * from place";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById: function(country, callback){
		var sql = "select * from place WHERE place = '"+country.c_name+"'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},

	insert: function(country_create, callback){
		var sql = "INSERT INTO place(username, country, place, history, about,travel_agency,cost,contact) VALUES ('"+country_create.username+"', '"+country_create.country+"','"+country_create.place+"','"+country_create.history+"','"+country_create.about+"','"+country_create.travel_agency+"',"+country_create.cost+",'"+country_create.contact+"')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	
	update:function(country,country_update, callback){
		var sql = "UPDATE `place` SET `country`='"+country_update.country+"',`place`='"+country_update.place+"', `history`='"+country_update.history+"',`about`='"+country_update.about+"',`travel_agency`='"+country_update.travel_agency+"',`cost`='"+country_update.cost+"',`contact`='"+country_update.contact+"' WHERE place='"+country.c_name+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	likeInsert:function(update, callback){
		var sql = "UPDATE `place` SET `customer_name`='"+update.username+"',`status`='like' WHERE place='"+update.place+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	unlikeInsert:function(update, callback){
		var sql = "UPDATE `place` SET `customer_name`='"+update.username+"',`status`='unlike' WHERE place='"+update.place+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	delete: function(country_name, callback){
		var sql = "DELETE FROM place WHERE place='"+country_name.place+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	checklist: function(list, callback){
		var sql = "select * from place WHERE customer_name = '"+list.username+"' and status= 'like'";
		db.getResults(sql, function(results){
			callback(results);
		});

	}

}