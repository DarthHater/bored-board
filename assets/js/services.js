var boredBoardFactory = angular.module('boredBoardFactory', ['ngRoute']);

boredBoardFactory.factory('Scroll', function (socket, $rootScope) {
  var threads = [];
  var busy = false;
  var after = '';

    return { 
      init: function (callback) {
      socket.get('/api/board/listthreads', function (data) {
        if(callback) {
          callback.call(null, data);
        }
      })
    },
    nextPage: function (callback) {
      if (this.busy) return;
      this.busy = true;

      socket.get('/api/board/listthreads', function (data) {
        var json = JSON.parse(data);
        if(callback) {
          this.busy = false;
          callback.call(null, data);
        }
      })
    }
  }
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