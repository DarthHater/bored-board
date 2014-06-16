/**
 * Post
 *
 * @module      :: Model
 * @description :: Model for Posts, I think?
 */

module.exports = function(mongoose) {

	 var schema = new mongoose.Schema({
	 	body: String,
	 	creator: mongoose.Schema.Types.ObjectId,
	 	thread: mongoose.Schema.Types.ObjectId,
	 	createdAt: { type: Date, default: Date.now }
	})

 	try {
        mongoose.model('Post', schema);
    } catch (error) {}

    return mongoose.model('Post');
}