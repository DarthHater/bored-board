var mongoose = require('mongoose'),
    User = require('../../../api/services/models/User')(mongoose),
    sinon = require('sinon'),
    assert = require('assert');

describe('The User Model', function () {
    describe('before the user is created', function () {
        it ('should hash the password', function (done) {
            User({
                password: 'password'
            }).save(function (err, user) {
                assert.notEqual(user.password, 'password');
                done();
            });
        });
    });
});