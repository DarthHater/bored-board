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

// Using createConnection instead of connect to establish a distinct connection
mongoose.connect(helper.connectionString(conf.environment), options);

 
/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
 
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {

});

module.exports = {
	Thread: require('./models/Thread.js')(mongoose),
	User: require('./models/User.js')(mongoose),
	Post: require('./models/Post.js')(mongoose),
	Message: require('./models/Message.js')(mongoose),
	Conversation: require('./models/Conversation.js')(mongoose),
	helper: require('./models/Helpers.js')
};