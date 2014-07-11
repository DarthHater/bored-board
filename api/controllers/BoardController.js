/**
 * BoardController
 *
 * @description :: Server-side logic for managing the Board
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../services/db'),
	Q = require('q');

module.exports = {
	createthread: function(req, res) {
		var socket = req.socket,
			user = req.user._id,
			username = req.user.username,
			title = req.body.title,
			body = req.body.body;

		db.Thread(
			{ title: title,
			creator: user,
			createdBy: username,
			updatedBy: username,
			updatedId: user }
			)
		.save(function (err, thread) {
			if(err) return res.json(
				'Shit done fucked up', 
				500
				);

			db.Post(
				{ body: body, thread: thread._id, creator: user, username: username}
				)
			.save(function (err, post) {
				
				socket.emit('new:thread', thread);

				return res.json(
					'Thread and post inserted post._id: ' + post._id + ' thread._id: ' + post.thread,
					 200
					 );
			});			
		});
	},

	replythread: function(req, res) {
		var body = req.body.body,
			thread = req.body.thread,
			user = req.user._id,
			username = req.user.username;
			socket = req.socket;

		// hard coding creator to thread id for now, I'll fill in once I get User logic figured out
		db.Post({ body: body, thread: thread, creator: user, username: username }).save(function (err, post) {

			db.Thread.findOne({ _id: thread }, function(err, thread) {
				if (err) return res.json('SHIT DONE FUCKED UP', 500);

				thread.updatedBy = username; 
				thread.updatedId = user;
				thread.dateUpdated = Date.now();
				thread.save();

				socket.to(thread).emit('new:post', post);
	
				return res.json(
					{ post: post }, 
					200
					);
			});
		});
	},

	listthreads: function(req, res) {
		db.Thread.find().limit(50).lean().exec(function (err, docs) {
			if (err) return res.json('Shit done fucked up', 500);

			return res.json(
				{ threads: db.helper.toJSON(docs) },
				200
				);
		});
	},

	viewthread: function(req, res) {
		var id = req.param('id');

		var posts = db.Post.find({ thread: id }).lean().exec();
		var thread = db.Thread.find({ _id: id }).lean().exec();

		var data = Q.all([
			posts, 
			thread
			]).then(function(data) {
				return res.json({ 
					posts: db.helper.toJSON(data[0]), 
					thread: db.helper.toJSON(data[1])}, 
					200);
			}, function (err) {
				return res.json('Shit done fucked up' + err, 500);
			});
	},

	deletethread: function(req, res) {
		var id = req.param('id');
		db.Thread.findOneAndRemove({ _id: id }, function (err) {
			if(err) return res.json('Shit done fucked up', 500);

			return res.json('Thread: ' + id + ' successfully deleted', 200);
		}); 
	}
};

