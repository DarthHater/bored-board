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

			return res.json('Thread inserted id: ' + thread._id, 200);
		})
	},

	list: function(req, res) {
		db.Thread.find().limit(10).lean().exec(function(err, docs) {
			if (err) return res.json('Shit done fucked up', 400);

			return res.view('thread/list', { threads: docs });
		});
	},

	view: function(req, res) {
		var id = req.param('id');

		db.Thread.findOne({ _id: id }, function(err, doc) {
			if (err) return res.json('Shit done fucked up', 400);

			return res.view('thread/view', { thread: doc });
		});
	},

	delete: function(req, res) {
		var id = req.param('id');
		db.Thread.findOneAndRemove({ _id: id }, function(err) {
			if(err) return res.json('Shit done fucked up', 400);

			return res.json('Thread: ' + id + ' successfully deleted', 200);
		}); 
	}
};

