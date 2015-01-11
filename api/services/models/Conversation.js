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
	 	createdBy: { 
	 		type: String,
	 		required: true
	 	},
	 	updatedBy: {
	 		type: String,
	 		required: true
	 	},
	 	updatedId: {
	 		type: mongoose.Schema.Types.ObjectId,
	 		required: true
	 	},
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