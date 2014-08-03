var bbcode = require('bbcode');
var conf = require('../../../config/local');

module.exports = {
	toJSON: function(object) {
		// bbcode post bodies
		if(Object.keys(object).length > 0 && object[0].hasOwnProperty("body")) {
			for (var key in object) {
				var obj = object[key];
				obj.body = bbcode.parse(obj.body);
			}
		}

		// remove passwords from user object
		//if(typeof object[0].password != undefined) {
		//	for (var key in object) {
		//		var obj = object[key];
		//		delete obj.password;
		//	}
		//}
		var newObject = JSON.stringify(object);
		var parsedObject = JSON.parse(newObject);

		return parsedObject;
	},
	connectionString: function(env) {
		if (env === 'development') {

			return conf.mongoDblocal.prefix + 
				conf.mongoDblocal.server + '/' +
				conf.mongoDblocal.database;
		}
		else {

			return conf.mongoDbprod.prefix + 
				conf.mongoDbprod.username + ':' +
				conf.mongoDbprod.password + '@' +
				conf.mongoDbprod.host1 + ':' + 
				conf.mongoDbprod.port + '/' + 
				conf.mongoDbprod.database + ',' +
				conf.mongoDbprod.prefix + 
				conf.mongoDbprod.username + ':' +
				conf.mongoDbprod.password + '@' +
				conf.mongoDbprod.host2 + ':' + 
				conf.mongoDbprod.port;
		}
	}
};