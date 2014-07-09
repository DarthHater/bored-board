var BoardController = require('../../api/controllers/BoardController'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The Board Controller', function () {
    describe('when we load the view thread function', function () {
        it ('should return a thread and posts', function () {
            var view = sinon.spy();
            BoardController.viewthread(null, {
                view: view
            });
            assert.ok(view.called);
        });
    });
});