/**
 * Post
 *
 * @module      :: Model
 * @description :: Model for Posts, I think?
 */

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

 	try {
        mongoose.model('User', schema);
    } catch (error) {}

    return mongoose.model('User');
}