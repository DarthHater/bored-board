var mongoose = require('mongoose'),
    Message,
    assert = require('chai').assert,
    expect = require('chai').expect,
    sinon = require('sinon'),
    message;

describe('The Message Model', function () {
    before(function(done) {
        Message = require('../../../api/services/models/Message')(mongoose);
        done();
    });

    beforeEach( function (done) {
        message = {
            username: 'Feffy',
            body: 'Shit yeah A++'
        };
        done();
    });

    describe('given a valid message', function () {
        it('should create the message', function (done) {
            Message(message).save(function (err, message) {
                expect(message.body).to.equal('Shit yeah A++');
                done();
            });
        });
    });

    describe('given a message without a body', function () {
        it('should reject the message', function (done) {
            delete message.body;
            Message(message).save(function (err, message) {
                expect(err.errors.body.message).to.equal('Path `body` is required.');
                done();
            });
        });
    });

    describe('given a message without a username', function() {
        it('should reject the message', function (done) {
            delete message.username;
            Message(message).save(function (err, message) {
                expect(err.errors.username.message).to.equal('Path `username` is required.');
                done();
            });
        });
    });

    afterEach(function (done) {
        message = null;
        done();
    });
});