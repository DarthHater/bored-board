var mongoose = require('mongoose'),
    User = require('../../../api/services/models/User')(mongoose),
    assert = require('chai').assert,
    expect = require('chai').expect;

describe('The User Model', function () {
    before(function() {
        mongoose.connect('mongodb://localhost/bored-board');
        User({
            username: 'testuser',
            password: 'testpassword',
            emailaddress: 'newtest@test.com'
        }).save(function (err, user) {
            if (err) console.log('Setup of user failed because: ' + err.message);
        });
    });

    describe('before the user is created', function () {
        it ('should hash the password', function (done) {
            User({
                username: 'Test User 2',
                password: 'password',
                emailaddress: 'testemailaddress2@gmail.com'
            }).save(function (err, user) {
                assert.notEqual(user.password, 'password');
                done();
            });
        });
    });

    describe('given a duplicate email address', function() {
        it('should reject the user from being created', function (done) {
            User({
                username: 'testusername',
                password: 'testpassword',
                emailaddress: 'newtest@test.com'
            }).save(function (err, user) {
                expect(err.errors.emailaddress.message).to.equal('Validator failed for path `emailaddress` with value `newtest@test.com`');
                done();
            });
        });
    });

    describe('given a duplicate username', function () {
        it('should reject the user from being created', function (done) {
            User({
                username: 'testuser',
                password: 'anothertest',
                emailaddress: 'differentemailaddress@gmail.com'
            }).save(function (err, user) {
                expect(err.errors.username.message).to.equal('Validator failed for path `username` with value `testuser`');
                done();
            });
        });
    });

    after(function() {
        User.findOneAndRemove({
            username: 'testuser'
        }, function (err) {
            if (err) console.log('User not removed?');
        });

        User.findOneAndRemove({
            username: 'Test User 2'
        }, function (err) {
            if (err) console.log('Test User 2 not removed');
        });

        User.findOneAndRemove({
            username: 'testusername'
        }, function (err) {
            if (err) console.log('testusername not removed');
        });
    });
});