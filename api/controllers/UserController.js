/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var db = require('../services/db');

module.exports = {
  /**
   * `UserController.view()`
   */
  view: function (req, res) {
    var id = req.param('id');

    console.log('userId');

    db.User.findOne({ _id: id }).lean().exec(function (err, user) {
      if (err) return res.json('SHIT DONE FUCKED UP', 500);

      return res.json(
        { user: user }, 
          200
          );
    });
  },
};

