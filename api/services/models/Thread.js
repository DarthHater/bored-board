/**
 * MyModel
 *
 * @module      :: Model
 * @description :: Just to try mongoose
 */

module.exports = function(mongoose) {

	 var schema = new mongoose.Schema({

	 title: String

	})

 	try {
        mongoose.model('Thread', schema);
    } catch (error) {}

    return mongoose.model('Thread');
}