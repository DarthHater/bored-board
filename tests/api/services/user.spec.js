var mongoose = require('mongoose'),
    User = require('../../../api/services/models/User')(mongoose),
    sinon = require('sinon'),
    assert = require('assert');

describe('The User Model', function () {
    before(function() {
        User({
            username: 'Test User',
            password: 'testpassword',
            emailaddress: 'testemailaddress@gmail.com'
        }).save(function (err, user) {
            if (err) console.log('Setup of user failed because: ' + err.message);
            //console.log('Setup of : ' + user.username + ' was successful');
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
            //assert.fail(1, 0, 'Not yet implemented');
            User({
                username: 'testusername',
                password: 'testpassword',
                emailaddress: 'testemailaddress@gmail.com'
            }).save(function (err, user) {

            });
        });
    });

    describe('given a duplicate username', function () {
        it('should reject the user from being created', function (done) {
            assert.fail(1, 0, 'Not yet implemented');

            // User({
            //     username: 'Test User',
            //     password: 'anothertest',
            //     emailaddress: 'differentemailaddress@gmail.com'
            // }).save(function (err, user) {

            // });
        });
    });

    after(function() {
        User.findOneAndRemove({
            username: 'Test User'
        }, function (err) {
            if (err) console.log('User not removed?');
            console.log('User removed');
        });

        User.findOneAndRemove({
            username: 'Test User2'
        }, function (err) {
            if (err) console.log('Test User 2 not removed');
            console.log('Test User 2 removed');
        });
    });
});