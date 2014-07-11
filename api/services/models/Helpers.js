var bbcode = require('bbcode');

module.exports = {
	toJSON: function(object) {

		if(typeof object[0].body != undefined ) {
			for (var key in object) {
				var obj = object[key];
				obj.body = bbcode.parse(obj.body);
				console.log(obj);
			}
		}
		var newObject = JSON.stringify(object);
		var parsedObject = JSON.parse(newObject);

		return parsedObject;
	}
}