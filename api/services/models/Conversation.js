/**
 * Thread
 *
 * @module      :: Model
 * @description :: Model for Threads, I think?
 */

module.exports = function(mongoose) {

	 var schema = new mongoose.Schema({
	 	title: { 
	 		type: String,
	 		required: true
	 	},
	 	creator: {
	 		type: mongoose.Schema.Types.ObjectId,
	 		required: true
	 	},
	 	createdBy: String,
	 	updatedBy: {
	 		type: String,
	 		required: true
	 	},
	 	updatedId: mongoose.Schema.Types.ObjectId,
	 	datePosted: { type: Date, default: Date.now },
	 	dateUpdated: { type: Date, default: Date.now },
	 	numberOfPosts: { type: Number, default: 1 }
	});

 	schema.pre('save', function(next) {
		var conversation = this; 

		conversation.dateUpdated = Date.now();

		next();
	});

 	try {
        mongoose.model('Conversation', schema);
    } catch (error) {}

    return mongoose.model('Conversation');
};