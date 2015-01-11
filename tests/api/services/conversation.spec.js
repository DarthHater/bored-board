var mongoose = require('mongoose'),
    Conversation = require('../../../api/services/models/Conversation')(mongoose),
    assert = require('chai').assert,
    expect = require('chai').expect,
    sinon = require('sinon'),
    id,
    convo;

describe('The Conversation Model', function () {
    before(function(done) {
        mongoose.connect('mongodb://localhost/bored-board');

        // Clear collection prior to running tests to ensure valid tests
        Conversation.remove({}, function(err) { 
        });
        done();
    });

    beforeEach(function (done) {
        id = mongoose.Types.ObjectId();
        convo = {
                creator: id,
                title: 'Test Conversation',
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

    after(function(done) {
        // Clear collection after testing to ensure it is pristine for other tests
        Conversation.remove({}, function(err) { 
        });
        mongoose.connection.close();
        done();
    });
});