/**
 * We load mongoose
 */
var mongoose = require('mongoose');
var conf = require('../../config/local');
 

if (conf.environment === 'development') {
	mongoose.connect(conf.mongoDblocal.prefix + 
		conf.mongoDblocal.server + '/' +
		conf.mongoDblocal.database);
}
else {
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

	var connectionstring = 
		conf.mongoDbprod.prefix + 
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

	mongoose.connect(connectionstring, options);
}
 
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