const db = require('./db');

module.exports= {	
	getAll: function(callback){
		var sql = "select * from place";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	insert: function(country_create, callback){
		var sql = "INSERT INTO place(username, country, history, about,travel_agency,cost,contact) VALUES ('"+country_create.username+"', '"+country_create.country+"','"+country_create.history+"','"+country_create.about+"','"+country_create.trevel_agent+"','"+country_create.cost+"','"+country_create.contact+"')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	
	update:function(id,user_update, callback){
		var sql = "UPDATE users SET name='"+user_update.name+"', username='"+user_update.username+"',password='"+user_update.password+"',dob='"+user_update.dob+"',address='"+user_update.address+"',contact='"+user_update.contact+"', email='"+user_update.email+"' WHERE username='"+id.username+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(true);
			}else{
				callback(false);
			}
		});


	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE username='"+id.username+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}