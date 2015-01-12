var mongoose = require('mongoose'),
    Conversation,
    assert = require('chai').assert,
    expect = require('chai').expect,
    sinon = require('sinon'),
    id,
    id2,
    arr,
    convo;

describe('The Conversation Model', function () {
    before(function(done) {
        Conversation = require('../../../api/services/models/Conversation')(mongoose);
        done();
    });

    beforeEach(function (done) {
        id = mongoose.Types.ObjectId();
        id2 = mongoose.Types.ObjectId();
        arr = [];
        arr.push(id);
        arr.push(id2);
        convo = {
                creator: id,
                title: 'Test Conversation',
                recipients: arr,
                updatedBy: 'Feffy',
                createdBy: 'Feffy',
                updatedId: id
        };
        done();
    });

    describe('given a valid conversation', function () {
        it('should create the conversation', function (done) {
            Conversation(convo).save(function (err, conversation) {
                expect(conversation.title).to.equal('Test Conversation');
                done();
            });
        });
    });

    describe('given a valid conversation', function () {
        it('when created the number of posts should default to one', function (done) {
            Conversation(convo).save(function (err, conversation) {
                expect(conversation.numberOfPosts).to.equal(1);
                done();
            });
        });
    });

    describe('given a conversation without a title', function () {
        it('should reject the conversation', function (done) {
            delete convo.title;
            Conversation(convo).save(function (err, conversation) {
                expect(err.errors.title.message).to.equal('Path `title` is required.');
                done();
            });
        });
    });

    describe('given a conversation without a recipient', function () {
        it('should reject the conversation', function (done) {
            delete convo.recipients;
            Conversation(convo).save(function (err, conversation) {
                expect(err.errors.recipients.message).to.equal('Path `recipients` is required.');
                done();
            });
        });
    });

    describe('given a conversation with one recipient', function () {
        it('should create the conversation', function (done) {
            convo.recipients.splice(0, 1);
            Conversation(convo).save(function (err, conversation) {
                expect(conversation.title).to.equal('Test Conversation');
                done();
            });
        });
    });

    describe('given a conversation without who it is updated by', function() {
        it('should reject the conversation', function (done) {
            delete convo.updatedBy;
            Conversation(convo).save(function (err, conversation) {
                expect(err.errors.updatedBy.message).to.equal('Path `updatedBy` is required.');
                done();
            });
        });
    });

    describe('given a conversation without a creator id', function() {
        it('should reject the conversation', function (done) {
            delete convo.creator;
            Conversation(convo).save(function (err, conversation) {
                expect(err.errors.creator.message).to.equal('Path `creator` is required.');
                done();
            });
        });
    });

    afterEach(function (done) {
        convo = null;
        done();
    });
});