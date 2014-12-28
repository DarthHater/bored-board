var boredBoardFactory = angular.module('boredBoardFactory', ['ngRoute', 'ngCookies']);

boredBoardFactory.factory('AuthService', function ($http, Session) {
  var authService = {};

  authService.login = function(path, credentials) {
    return $http.post(path, credentials).
      success(function(res) {
        Session.create('', res.user._id);
        return res.user;
      }).
      error(function(error) {
        return error; 
      });
  }

  authService.logout = function (path) {
    return $http.get(path).
      success(function(res) {
        Session.destroy();

        return true;
      }).
      error(function(error) {
        return error;
      });
  }

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  return authService;
});

boredBoardFactory.service('Session', function ($cookieStore) {
  this.create = function (sessionId, userId) {
    $cookieStore.put('userid', userId);

    this.id = sessionId;
    this.userId = userId;
  };

  this.destroy = function () {
    $cookieStore.remove('userid');

    this.id = null;
    this.userId = null;
  };

  return this;
});

boredBoardFactory.factory('Scroll', function (socket) {
  
  var Scroll = function(url, initial, type) {
    this.threads = [];
    this.busy = false;
    this.initialize = false;
    this.after = '';
    this.path = url;
    this.grab = initial;
    this.objecttype = type;
  };

  Scroll.prototype.init = function (callback) {
    this.busy = true;
    this.initialize = true;
    socket.get(this.path + '?initial=' + this.grab, function (data) {
      var json = JSON.parse(data);
      if(callback) {
        callback.call(null, json);
        if (this.objecttype === 'threads') {
          last = json.threads[json.threads.length -1];
          this.after = encodeURIComponent(last.dateUpdated);
        }
        else {
          last = json.posts[json.posts.length -1];
          this.after = encodeURIComponent(last.createdAt);
        }
        this.busy = false;
      }
    }.bind(this));
  };

  Scroll.prototype.nextPage = function (callback) {
    if (this.busy || this.initialize == false) return;
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
      });
    },
    get: function (path, callback) {
      socket.get(path, function (data) {
        $rootScope.$apply(function () {
          if(callback) {
            callback.call(null, data);
          }
        });
      });
    },
    post: function(path, data, callback) {
      socket.post(path, data, function(data) {
        $rootScope.$apply(function () {
          if (callback) {
            callback.call(null, data);
          }
        });
      });
    },
    join: function(room, callback) {
      socket.join(room);
      if (callback) {
          callback.call(null, room);
      }
    }
  };
});