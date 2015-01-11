/**
 * ConversationController
 *
 * @description :: Server-side logic for managing Conversations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../services/db');

module.exports = {

  /**
   * `ConversationController.create()`
   */
  create: function (req, res) {
    var conversation = {
      creator: req.session.passport.user,
      title: req.body.title,
      updatedId: req.session.passport.user,
      updatedBy: req.body.username,
      createdBy: req.body.username
    };

    var message = {
      body: req.body.body,
      creator: req.session.passport.user,
      username: req.body.username
    };

    db.Conversation(conversation).save(function (err, data) {
      if (err) res.json('Woops', 500);

      db.Message(message).save(function (err, data) {
        if (err) res.json('Woops', 500);

        return res.json('Ok!', 200);
      });
    });
  },

  /**
   * `ConversationController.read()`
   */
  read: function (req, res) {
    var id = req.param('id');

    var conversation = {};

    db.Conversation.find({ _id: id }).lean().exec(function(err, convo) {
      if(err) return res.json('Woops!', 500);
      conversation = convo;
      db.Message.find({ conversation: id }).lean().exec(function(err, messages) {
        if(err) return res.json('Woops', 500);

        return res.json({
          conversation: conversation,
          messages: messages
          },
          200
        );
      });
    });

    return res.json({
      message: message
      }, 
      200
    );
  },

  /**
   * `ConversationController.list()`
   * Gives back a list of accessible conversations for the logged in user 
   */
  list: function (req, res) {
    var conversations = {};
    var user = req.session.passport.user;

    db.Conversation.find({ creator: user }).lean().exec(function(err, convos) {
      return res.json({
        conversations: conversations
        }, 
        200
      );
    });
  },


  /**
   * `ConversationController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },


  /**
   * `ConversationController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};

