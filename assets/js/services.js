var boredBoardFactory = angular.module('boredBoardFactory', ['ngRoute']);

boredBoardFactory.factory('Scroll', function (socket) {
  
  var Scroll = function(url, initial) {
    this.threads = [];
    this.busy = false;
    this.after = '';
    this.path = url;
    this.grab = initial;
  };

  Scroll.prototype.init = function (callback) {
    this.busy = true;
    socket.get(this.path + '?initial=' + this.grab, function (data) {
      var json = JSON.parse(data);
      if(callback) {
        callback.call(null, json);
        last = json.threads[json.threads.length -1];
        this.after = encodeURIComponent(last.dateUpdated);
        this.busy = false;
      }
    }.bind(this));
  };

  Scroll.prototype.nextPage = function (callback) {
    if (this.busy) return;
    this.busy = true;

    socket.get(this.path + '?after=' + this.after, function (data) {
      var json = JSON.parse(data);
      if(callback) {
        callback.call(null, json);
        this.busy = false;
      }
    }.bind(this));
  };

  return Scroll;
});

boredBoardFactory.factory('socket', function ($rootScope, $routeParams) {
  var socket = io.connect();
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
    get: function (path, callback) {
      socket.get(path, function (data) {
        $rootScope.$apply(function () {
          if(callback) {
            callback.call(null, data);
          }
        });
      })
    },
    post: function(path, data, callback) {
      socket.post(path, data, function(data) {
        $rootScope.$apply(function () {
          if (callback) {
            callback.call(null, data);
          }
        });
      })
    },
    join: function(room, callback) {
      socket.join(room);
      if (callback) {
          callback.call(null, room);
      }
    }
  }
});