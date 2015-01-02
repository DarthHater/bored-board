var boredBoardApp = angular.module('boredBoardApp', ['ngRoute', 'infinite-scroll', 'boredBoardFactory', 'boredBoredDirectives']).
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
  }]).
  constant('APP_ROUTES', {
    thread_list: '/api/board/listthreads',
    view_thread: '/api/board/viewthread/',
    create_thread: '/api/board/createthread',
    reply_thread: '/api/board/replythread',
    create_user: '/api/auth/create',
    view_user: '/api/user/view/',
    login: '/api/auth/login',
    logout: '/api/auth/logout'
  });

boredBoardApp.controller('ApplicationController', function ($scope, $location, APP_ROUTES, AuthService) {
  $scope.currentUser = null;
  $scope.isAuthenticated = AuthService.isAuthenticated;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logout = function () {
    AuthService.logout(APP_ROUTES.logout).
    then(function (){
      $scope.currentUser = null;

      $location.path("#/login");
    },
    function(error) {
      console.log(error);
    });
  };
});

boredBoardApp.controller('ThreadListCtrl', function ($scope, socket, APP_ROUTES, Scroll) {
  
  var scroll = new Scroll(APP_ROUTES.thread_list, 15, 'threads');

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

boredBoardApp.controller('ThreadCreateCtrl', function ($scope, $location, APP_ROUTES, socket) {
  $scope.post = function (isValid) {
    if (isValid) {
      var data = {};
      data.body = $scope.message.body;
      data.title = $scope.message.title;

      // TODO: move into it's own service
      socket.post(APP_ROUTES.create_thread, data, function(data) {
        $location.path( "#/thread/list" );
      });
    }
  };
});

boredBoardApp.controller('ThreadViewCtrl', function ($scope, socket, $sce, $routeParams, APP_ROUTES, Scroll) {
  var id = $routeParams.threadId;

  var scroll = new Scroll(APP_ROUTES.view_thread + id, 15, 'posts');

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

boredBoardApp.controller('ReplyThreadCtrl', function ($scope, socket, APP_ROUTES, $routeParams) {
    $scope.post = function (isValid) {
      if(isValid) {
        var data = {};
        data.body = $scope.message.body;
        data.thread = $scope.posts[0].thread;

        // TODO: move into it's own service
        socket.post(APP_ROUTES.reply_thread, data, function (data) {
          $scope.message.body = null;
          $scope.replyPostForm.$setPristine();
        });
      }
    };
});

boredBoardApp.controller('UserViewCtrl', function ($scope, socket, APP_ROUTES, $routeParams) {
  var id = $routeParams.userId;

  // TODO: move into it's own service
  socket.get(APP_ROUTES.view_user + id, function (data) {
    var json = JSON.parse(data);

    $scope.user = json.user;
  });
});

boredBoardApp.controller('AuthSignInCtrl', function ($scope, $location, $http, $routeParams, APP_ROUTES, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.signin = function(isValid) {
    if(isValid) {
      AuthService.login(APP_ROUTES.login, $scope.credentials).
        then(function (res) {
          $scope.setCurrentUser(res);

          $location.path( "#/thread/list" );
        }, function (error) {
          $scope.credentials.password = null;
          $scope.userSignInForm.$setPristine();
        });
    }
  };
});

boredBoardApp.controller('AuthRegisterCtrl', function ($scope, $location, $http, APP_ROUTES, $routeParams) {
  $scope.register = function(isValid) {
    if(isValid) {
      var data = {};

      data.username = $scope.user.username;
      data.password = $scope.user.password;
      data.email = $scope.user.email;

      // TODO: move into AuthService
      $http.post(APP_ROUTES.create_user, data).
      success(function(data) {
        var json = JSON.parse(data);

        $scope.user = json.user;

        $location.path( "#/thread/list" );
      }).
      error(function(data) {

      });
    }
  };
});