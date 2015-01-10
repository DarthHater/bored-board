/**
 * Message
 *
 * @module      :: Model
 * @description :: Model for Messages, I think?
 */

module.exports = function(mongoose) {

	 var schema = new mongoose.Schema({
	 	body: { 
	 		type: String,
	 		required: true 
	 	},
	 	creator: mongoose.Schema.Types.ObjectId,
	 	username: {
	 		type: String,
	 		required: true
	 	},
	 	conversation: mongoose.Schema.Types.ObjectId,
	 	createdAt: { type: Date, default: Date.now }
	});

 	try {
        mongoose.model('Message', schema);
    } catch (error) {}

    return mongoose.model('Message');
};