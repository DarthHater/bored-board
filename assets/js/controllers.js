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
      when('/user/register', {
        templateUrl: 'partials/register.html',
        controller: 'AuthRegisterCtrl'
      }).
      when('/user/:userId', {
        templateUrl: 'partials/userview.html',
        controller: 'UserViewCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/signin.html',
        controller: 'AuthSignInCtrl'
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
  
  var scroll = new Scroll('/api/board/listthreads', 15, 'threads');

  scroll.init(function (data) {
    $scope.threads = data.threads;
  });

  $scope.busy = scroll.busy;
  
  $scope.nextPage = function() {
      scroll.nextPage(function (data) {
      for (var thread in data.threads) {
        $scope.threads.push(data.threads[thread]);
        scroll.after = encodeURIComponent(data.threads[thread].dateUpdated);
      }
    });
  };

  socket.on('new:thread', function(data) {
    $scope.threads.push(data);
  });
});

boredBoardApp.controller('ThreadCreateCtrl', function ($scope, $location, socket) {
  $scope.post = function (isValid) {
    if (isValid) {
      var data = {};
      data.body = $scope.message.body;
      data.title = $scope.message.title;

      socket.post('/api/board/createthread', data, function(data) {
        $location.path( "#/thread/list" );
      });
    }
  };
});

boredBoardApp.controller('ThreadViewCtrl', function ($scope, socket, $sce, $routeParams, Scroll) {
  var id = $routeParams.threadId;

  var scroll = new Scroll('/api/board/viewthread/' + id, 15, 'posts');

  scroll.init(function (data) {
    $scope.posts = data.posts;
    $scope.thread = data.thread;
  });

  $scope.busy = scroll.busy;
  
  $scope.nextPage = function() {
      scroll.nextPage(function (data) {
      for (var post in data.posts) {
        $scope.posts.push(data.posts[post]);
        scroll.after = encodeURIComponent(data.posts[post].createdAt);
      }
    });
  };

  socket.on('new:post', function (data) {
    $scope.posts.push(data);
    scroll.after = data.createdAt;
  });

  $scope.renderHtml = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };

  $scope.quote_post = function(id) {
    var info = $('#post_'+id+'_info .postinfo').text();
    var body = jQuery.trim($('#post_'+id+'_body .postbody').text());
    $('#body').val($('#body').val()+'[quote]'+info+'\n'+body+'[/quote]\n\n');
  };
});

boredBoardApp.controller('ReplyThreadCtrl', function ($scope, socket, $routeParams) {
    $scope.post = function (isValid) {
      if(isValid) {
        var data = {};
        data.body = $scope.message.body;
        data.thread = $scope.posts[0].thread;

        socket.post('/api/board/replythread', data, function (data) {
          $scope.message.body = null;
          $scope.replyPostForm.$setPristine();
        });
      }
    };
});

boredBoardApp.controller('UserViewCtrl', function ($scope, socket, $routeParams) {
  var id = $routeParams.userId;

  socket.get('/api/user/view/' + id, function (data) {
    var json = JSON.parse(data);

    $scope.user = json.user;
  });
});

boredBoardApp.controller('AuthSignInCtrl', function ($scope, $http, $routeParams) {
  $scope.signin = function(isValid) {
    if(isValid) {
      var data = {};

      data.username = $scope.user.username;
      data.password = $scope.user.password;

      $http.post('/api/auth/process/', data).
      sucess(function(data) {
        var json = JSON.parse(data);

        $scope.user = json.user;
      }).
      error(function(data) {

      });
    }
  };
});

boredBoardApp.controller('AuthRegisterCtrl', function ($scope, $http, $routeParams) {
  $scope.register = function(isValid) {
    if(isValid) {
      var data = {};

      data.username = $scope.user.username;
      data.password = $scope.user.password;
      data.email = $scope.user.email;

      $http.post('/api/auth/create/', data).
      success(function(data) {
        var json = JSON.parse(data);

        $scope.user = json.user;
      }).
      error(function(data) {

      });
    }
  };
});