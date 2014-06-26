module.exports = {
	toJSON: function(object) {
		var newObject = JSON.stringify(object);
		var parsedObject = JSON.parse(newObject);

		return parsedObject;
	}
}