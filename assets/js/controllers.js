var boredBoardApp = angular.module('boredBoardApp', ['ngRoute', 'boredBoardFactory']).
config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/thread/list', {
        templateUrl: 'partials/list.html',
        controller: 'ThreadListCtrl'
      }).
      when('/thread/view/:threadId', {
        templateUrl: 'partials/view.html',
        controller: 'ThreadViewCtrl'
      }).
      otherwise({
        redirectTo: '/thread/list'
      });

      $locationProvider.html5Mode(true);
  }]);

boredBoardApp.controller('ThreadListCtrl', function ($scope, socket) {
  socket.get('/api/board/listthreads', function (data) {
    var json = JSON.parse(data);

    $scope.threads = json.threads;
  });

  socket.on('new:thread', function(data) {
    $scope.threads.push(data);
  });
});

boredBoardApp.controller('ThreadViewCtrl', function ($scope, socket, $routeParams) {
  var id = $routeParams.threadId;

  socket.get('/api/board/viewthread/' + id, function (data) {
    var json = JSON.parse(data);

    $scope.posts = json.posts;
    $scope.thread = json.thread;
  });

  socket.on('new:post', function (data) {
    $scope.posts.push(data);
  }); 
});

boredBoardApp.controller('ReplyThreadCtrl', function ($scope, socket, $http, $routeParams) {
    $scope.post = function () {
      var data = new Object();
      data.body = $scope.message.body;
      data.thread = $scope.posts[0].thread;
      data.creator = $scope.posts[0].thread; // lol fix me

      socket.post('/api/board/replythread', data, function (data) {
        // var json = JSON.parse(data);

        // $scope.posts.push(json);
      });
    }
});
