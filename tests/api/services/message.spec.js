var mongoose = require('mongoose'),
    Message = require('../../../api/services/models/Message')(mongoose),
    assert = require('chai').assert,
    expect = require('chai').expect,
    sinon = require('sinon');

describe('The Message Model', function () {
    before(function(done) {
        mongoose.connect('mongodb://localhost/bored-board');

        // Clear collection prior to running tests to ensure valid tests
        Message.remove({}, function(err) { 
        });
        done();
    });

    describe('given a valid message', function () {
        it('should create the message', function (done) {
            Message({
                username: 'Feffy',
                body: 'Shit yeah A++'
            }).save(function (err, message) {
                done();
            });
        });
    });

    describe('given a message without a body', function () {
        it('should reject the message', function (done) {
            Message({
                username: 'Feffy',
                body: ''
            }).save(function (err, message) {
                expect(err.errors.body.message).to.equal('Path `body` is required.');
                done();
            });
        });
    });

    describe('given a message without a username', function() {
        it('should reject the message', function (done) {
            Message({
                username: '',
                body: 'Test'
            }).save(function (err, message) {
                expect(err.errors.username.message).to.equal('Path `username` is required.');
                done();
            });
        });
    });

    after(function(done) {
        // Clear collection after testing to ensure it is pristine for other tests
        Message.remove({}, function(err) { 
        });
        mongoose.connection.close();
        done();
    });
});