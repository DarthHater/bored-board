/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var db = require('../services/db'),
    Q = require('q');

module.exports = {
  /**
   * `UserController.view()`
   */

  view: function (req, res) {
    var id = req.param('id');

    db.User.findOne({ _id: id }).lean().exec(function (err, user) {
      if (err) return res.json('SHIT DONE FUCKED UP', 500);

      var countThreads = db.Thread.count({ creator: id }).exec();
      var countPosts = db.Post.count({ creator: id}).exec();

      var data = Q.all([
        countThreads,
        countPosts]).then(function(data) {

          user.threads = data[0];
          user.posts = data[1];
          return res.json(
            { user: user }, 
              200
              );
        });
    });
  },
};

