const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0].type);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from users WHERE username = '"+id.username+"'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	
	insert: function(user_create, callback){
		var sql = "INSERT INTO users(name, username, password, dob, type, address,contact,email) VALUES ('"+user_create.name+"' ,'"+user_create.username+"', '"+user_create.password+"', '"+user_create.dob+"', '"+user_create.type+"', '"+user_create.address+"', '"+user_create.contact+"', '"+user_create.email+"')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	search: (search_item, callback) => {
		var sql = `SELECT * FROM users WHERE name = '${search_item}' OR username = '${search_item}' OR company_name = '${search_item}' OR contact = '${search_item}'`;
		db.getResults(sql, (results) => {
			callback(results);
		});
	},
	update:function(id,user_update, callback){
		var sql = "UPDATE users SET name='"+user_update.name+"', username='"+user_update.username+"',password='"+user_update.password+"',dob='"+user_update.dob+"',address='"+user_update.address+"',contact='"+user_update.contact+"', email='"+user_update.email+"' WHERE username='"+id.username+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
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