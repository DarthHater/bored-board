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
});

boredBoardApp.controller('ThreadViewCtrl', function ($scope, socket, $routeParams) {
  var id = $routeParams.threadId;

  socket.get('/api/board/viewthread/' + id, function (data) {
    var json = JSON.parse(data);

    $scope.posts = json.posts;
    $scope.thread = json.thread;
  });
});

boredBoardApp.controller('ReplyThreadCtrl', function ($scope, $http, $routeParams) {
    $scope.post = function () {
      var data = new Object();
      data.body = $scope.message.body;
      data.thread = $scope.message.thread;
      data.creator = $scope.message.creator; // lol fix me

      $http.post('api/board/replythread', data).success(function(data) {
        $scope.posts.push(data);
      }); 
    }
});
