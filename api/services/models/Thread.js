/**
 * Thread
 *
 * @module      :: Model
 * @description :: Model for Threads, I think?
 */

module.exports = function(mongoose) {

	 var schema = new mongoose.Schema({
	 	title: String,
	 	datePosted: { type: Date, default: Date.now }
	})

 	try {
        mongoose.model('Thread', schema);
    } catch (error) {}

    return mongoose.model('Thread');
}