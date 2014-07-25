/**
 * Thread
 *
 * @module      :: Model
 * @description :: Model for Threads, I think?
 */

module.exports = function(mongoose) {

	 var schema = new mongoose.Schema({
	 	title: String,
	 	creator: mongoose.Schema.Types.ObjectId,
	 	createdBy: String,
	 	updatedBy: String,
	 	updatedId: mongoose.Schema.Types.ObjectId,
	 	datePosted: { type: Date, default: Date.now },
	 	dateUpdated: { type: Date, default: Date.now },
	 	numberOfPosts: { type: Number, default: 1 }
	});

 	try {
        mongoose.model('Thread', schema);
    } catch (error) {}

    return mongoose.model('Thread');
};