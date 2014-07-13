var boredBoardApp = angular.module('boredBoardApp', ['ngRoute', 'boredBoardFactory']).
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/thread/list', {
        templateUrl: 'partials/list.html',
        controller: 'ThreadListCtrl'
      }).
      when('/thread/view/:threadId', {
        templateUrl: 'partials/view.html',
        controller: 'ThreadViewCtrl'
      }).
      when('/thread/new', {
        templateUrl: 'partials/newthread.html',
        controller: 'ThreadCreateCtrl'
      }).
      otherwise({
        redirectTo: '/thread/list'
      });
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

boredBoardApp.controller('ThreadCreateCtrl', function ($scope, $location, socket) {
  $scope.post = function () {
    var data = new Object();
    data.body = $scope.message.body;
    data.title = $scope.message.title;

    socket.post('/api/board/createthread', data, function(data) {
      $location.path( "#/thread/list" );
    });
  }
});

boredBoardApp.controller('ThreadViewCtrl', function ($scope, socket, $sce, $routeParams) {
  var id = $routeParams.threadId;

  socket.get('/api/board/viewthread/' + id, function (data) {
    var json = JSON.parse(data);

    $scope.posts = json.posts;
    $scope.thread = json.thread;
  });

  socket.on('new:post', function (data) {
    $scope.posts.push(data);
  });

  $scope.renderHtml = function(html_code)
  {
    return $sce.trustAsHtml(html_code);
  }; 
});

boredBoardApp.controller('ReplyThreadCtrl', function ($scope, socket, $routeParams) {
    $scope.post = function () {
      var data = new Object();
      data.body = $scope.message.body;
      data.thread = $scope.posts[0].thread;

      socket.post('/api/board/replythread', data, function (data) {

      });
    }
});

boredBoardApp.controller('UserViewCtrl', function ($scope, socket, $routeParams) {
  var id = $routeParams.userId;

  socket.get('/api/user/' + id, function (data) {
    var json = JSON.parse(data);

    $scope.user = json.user;
  });
});
