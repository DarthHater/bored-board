/**
 * ThreadController
 *
 * @description :: Server-side logic for managing Threads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../services/db');

module.exports = {
	create: function(req, res) {
		var thread = db.Thread({ title: 'Fuck it'});

		thread.save(function (err, thread) {
			if(err) return res.json('Shit done fucked up', 400);

			return res.json('Thread inserted', 200);
		})
	},

	view: function(req, res) {

		db.Thread.find({ title: 'Fuck it'}, function(err, docs) {
			if (err) return res.json('Shit done fucked up', 400);

			return res.json(docs, 200);
		});
	}
};

