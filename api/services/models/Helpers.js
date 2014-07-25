var bbcode = require('bbcode');

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
	}
};