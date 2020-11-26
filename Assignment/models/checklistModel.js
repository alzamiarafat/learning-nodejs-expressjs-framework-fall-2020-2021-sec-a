const db = require('./db');
module.exports= {	
    getById: function(user, callback){
		var sql = "select * from checklist WHERE username = '"+user.username+"' and status='like'";
		db.getResults(sql, function(results){
			callback(results);
		});

    },
    insert: function(list, callback){
		var sql = "INSERT INTO checklist(username, place, status) VALUES ('"+list.username+"', '"+list.place+"','like')";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
    update:function(place, callback){
		var sql = "UPDATE `checklist` SET `status`='like' WHERE place='"+place.c_name+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
}