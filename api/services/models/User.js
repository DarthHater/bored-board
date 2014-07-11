/**
 * Post
 *
 * @module      :: Model
 * @description :: Model for Posts, I think?
 */

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = function(mongoose) {

	var schema = new mongoose.Schema({
	 	username: String,
	 	password: String,
	 	firstName: String,
	 	lastName: String,
	 	threads: { type: Number, default: 0 },
	 	posts: { type: Number, default: 0 },
	 	createdAt: { type: Date, default: Date.now }
	})

	schema.pre('save', function(next) {
		var user = this; 

		if (!user.isModified('password')) return next();

		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash;

				next();
			});
		});
	})

	schema.method('toJSON', function() {
		var user = this.toObject();

		delete user.password;

		return user;
	})

 	try {
        mongoose.model('User', schema);
    } catch (error) {}

    return mongoose.model('User');
}