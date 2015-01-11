var mongoose = require('mongoose'),
	mockgoose = require('mockgoose');

before( function(done) {
	mockgoose(mongoose);
	mongoose.connect('mongodb://localhost/bored-board');
	done();
});

after( function() {
	mockgoose.reset();
	mongoose.connection.close();
});