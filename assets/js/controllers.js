var boredBoardApp = angular.module('boredBoardApp', ['ngRoute', 'infinite-scroll', 'boredBoardFactory']).
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
      when('/user/:userId', {
        templateUrl: 'partials/userview.html',
        controller: 'UserViewCtrl'
      }).
      when('/user/me', {
        templateUrl: 'partials/userview.html',
        controller: 'UserEditCtrl'
      }).
      otherwise({
        redirectTo: '/thread/list'
      });
  }]);

boredBoardApp.controller('ThreadListCtrl', function ($scope, socket, Scroll) {
  
  var scroll = new Scroll();

  scroll.init(function (data) {
    $scope.threads = data.threads;
  });

  $scope.busy = scroll.busy;
  
  $scope.nextPage = function() {
      scroll.nextPage(function (data) {
      for (thread in data.threads) {
        $scope.threads.push(data.threads[thread]);
        scroll.after = encodeURIComponent(data.threads[thread].dateUpdated);
      }
    });
  }

  socket.on('new:thread', function(data) {
    $scope.threads.push(data);
  });
});

boredBoardApp.controller('ThreadCreateCtrl', function ($scope, $location, socket) {
  $scope.post = function (isValid) {
    if (isValid) {
      var data = new Object();
      data.body = $scope.message.body;
      data.title = $scope.message.title;

      socket.post('/api/board/createthread', data, function(data) {
        $location.path( "#/thread/list" );
      });
    }
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

  $scope.renderHtml = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };

  $scope.quote_post = function(id) {
    var info = $('#post_'+id+'_info .postinfo').text();
    var body = jQuery.trim($('#post_'+id+'_body .postbody').text());
    $('#body').val($('#body').val()+'[quote]'+info+'\n'+body+'[/quote]\n\n');
  }
});

boredBoardApp.controller('ReplyThreadCtrl', function ($scope, socket, $routeParams) {
    $scope.post = function (isValid) {
      if(isValid) {
        var data = new Object();
        data.body = $scope.message.body;
        data.thread = $scope.posts[0].thread;

        socket.post('/api/board/replythread', data, function (data) {
          $scope.message.body = null;
          $scope.replyPostForm.$setPristine();
        });
      }
    }
});

boredBoardApp.controller('UserViewCtrl', function ($scope, socket, $routeParams) {
  var id = $routeParams.userId;

  socket.get('/api/user/view/' + id, function (data) {
    var json = JSON.parse(data);

    $scope.user = json.user;
  });
});
