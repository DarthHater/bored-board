var mongoose = require('mongoose'),
    User,
    assert = require('chai').assert,
    expect = require('chai').expect,
    user;

describe('The User Model', function () {
    before(function (done) {
        User = require('../../../api/services/models/User')(mongoose);

        done();
    });

    beforeEach(function (done) {
        user = {
            username: 'testuser',
            password: 'testpassword',
            emailaddress: 'newtest@test.com'
        };
        done();
    });

    describe('before the user is created', function () {
        it('should hash the password', function (done) {
            User(user).save(function (err, data) {
                assert.notEqual(data.password, user.password);
                done();
            });
        });
    });

    describe('given a duplicate email address', function() {
        it('should reject the user from being created', function (done) {
            user.username = 'imdifferent';
            User(user).save(function (err, data) {
                expect(err.errors.emailaddress.message).to.equal('Validator failed for path `emailaddress` with value `newtest@test.com`');
                done();
            });
        });
    });

    describe('given a duplicate username', function () {
        it('should reject the user from being created', function (done) {
            user.email = 'test@test.com';
            User(user).save(function (err, data) {
                expect(err.errors.username.message).to.equal('Validator failed for path `username` with value `testuser`');
                done();
            });
        });
    });

    afterEach(function (done) {
        user = null;
        done();
    });
});