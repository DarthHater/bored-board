var boredBoardApp = angular.module('boredBoardApp', 
	['ngRoute']).
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

boredBoardApp.controller('ThreadListCtrl', function ($scope, $http) {
  $http.get('api/board/listthreads').success(function(data) {
    $scope.threads = data.threads;
  });
});

boredBoardApp.controller('ThreadViewCtrl', function ($scope, $http, $routeParams) {
  var id = $routeParams.threadId;

  $http.get('api/board/viewthread/' + id).success(function(data) {
    $scope.posts = data.posts;
  });
});
