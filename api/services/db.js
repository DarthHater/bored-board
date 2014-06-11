/**
 * We load mongoose
 */
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/bored-board');
 
/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
var db = mongoose.connection;
 
console.log('Try to connect to MongoDB via Mongoose ...');
 
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {
 
    console.log('Connected to MongoDB !');
 
});

module.exports = {
	Thread: require('./models/Thread.js')(mongoose)
}