/**
 * BoardController
 *
 * @description :: Server-side logic for managing the Board
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../services/db');

module.exports = {
	createthread: function(req, res) {
		db.Thread({ title: 'Fuck it' }).save(function (err, thread) {
			if(err) return res.json('Shit done fucked up', 400);

			db.Post({body: 'test', thread: thread._id, creator: thread._id}).save(function (err, post) {

				return res.json('Thread and post inserted post._id: ' + post._id + ' thread._id: ' + post.thread, 200);
			});			
		});
	},

	replytothread: function(req, res) {
		var id = req.param('id');
		var body = req.param('body');

		// hard coding creator to thread id for now, I'll fill in once I get User logic figured out
		db.Post({ body: body, thread: id, creator: id}).save(function (err, post) {
			if(err) return res.view('500');

			// Probably should just publish an update via socket to the view, I'll figure this out soon?
			return res.view('thread/view');
		})
	},

	listthreads: function(req, res) {
		db.Thread.find().limit(50).lean().exec(function (err, docs) {
			if (err) return res.json('Shit done fucked up', 400);

			return res.json({ threads: db.helper.toJSON(docs) }, 200);
		});
	},

	viewthread: function(req, res) {
		var id = req.param('id');

		db.Post.find({ thread: id }).lean().exec(function (err, posts) {
			if (err) return res.json('Shit done fucked up', 400);

			return res.json({ posts: db.helper.toJSON(posts) }, 200);
		});
	},

	deletethread: function(req, res) {
		var id = req.param('id');
		db.Thread.findOneAndRemove({ _id: id }, function (err) {
			if(err) return res.json('Shit done fucked up', 400);

			return res.json('Thread: ' + id + ' successfully deleted', 200);
		}); 
	}
};

