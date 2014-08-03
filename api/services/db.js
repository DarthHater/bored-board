/**
 * We load mongoose
 */
var mongoose = require('mongoose');
var conf = require('../../config/local');
var helper = require('./models/Helpers');
 

var options = { 
			server: { 
				socketOptions: { 
					keepAlive: 1, 
					connectTimeoutMS: 30000 
				} 
			}, 
            replset: { 
            	socketOptions: { 
            		keepAlive: 1, 
            		connectTimeoutMS : 30000 
            	} 
            }
    	};
mongoose.connect(helper.connectionString(conf.environment), options);

 
/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
 
var db = mongoose.connection;
 
console.log('Trying to connect to MongoDB via Mongoose ...');
 
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {
    console.log('Connected to MongoDB !');
});

module.exports = {
	Thread: require('./models/Thread.js')(mongoose),
	User: require('./models/User.js')(mongoose),
	Post: require('./models/Post.js')(mongoose),
	helper: require('./models/Helpers.js')
};