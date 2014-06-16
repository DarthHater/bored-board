/**
 * ThreadController
 *
 * @description :: Server-side logic for managing Threads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../services/db');

module.exports = {
	create: function(req, res) {
		db.Thread({ title: 'Fuck it' }).save(function (err, thread) {
			if(err) return res.json('Shit done fucked up', 400);

			db.Post({body: 'test', thread: thread._id, creator: thread._id}).save(function (err, post) {

				return res.json('Thread and post inserted post._id: ' + post._id + ' thread._id: ' + post.thread, 200);
			});			
		});
	},

	reply: function(req, res) {
		var id = req.param('id');
		var body = req.param('body');

		// hard coding creator to thread id for now, I'll fill in once I get User logic figured out
		db.Post({ body: body, thread: id, creator: id}).save(function (err, post) {
			if(err) return res.view('500');

			// Probably should just publish an update via socket to the view, I'll figure this out soon?
			return res.view('thread/view');
		})
	},

	list: function(req, res) {
		db.Thread.find().limit(10).lean().exec(function (err, docs) {
			if (err) return res.json('Shit done fucked up', 400);

			return res.view('thread/list', { threads: docs });
		});
	},

	view: function(req, res) {
		var id = req.param('id');

		db.Post.find({ thread: id }, function (err, docs) {
			if (err) return res.json('Shit done fucked up', 400);

			console.log(docs);
			return res.view('thread/view', { posts: docs });
		});
	},

	delete: function(req, res) {
		var id = req.param('id');
		db.Thread.findOneAndRemove({ _id: id }, function (err) {
			if(err) return res.json('Shit done fucked up', 400);

			return res.json('Thread: ' + id + ' successfully deleted', 200);
		}); 
	}
};

