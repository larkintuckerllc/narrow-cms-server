(function() {
  'use strict';
  angular
  .module('app', ['ngRoute', 'ngMaterial', 'ncModule'])
  .config(routeConfig)
  .config(mdConfig)
  .config(ncConfig)
  .run(routeRun);
  /**
  * @name routeConfig
  * @desc configures routes
  * @param {Object} $routeProvider
  */
  routeConfig.$inject = ['$routeProvider'];
  function routeConfig($routeProvider) {
    $routeProvider.
    otherwise({
      redirectTo: '/'
    })
    .when('/error', {
      templateUrl: 'error.html',
      controller: 'ErrorController',
      controllerAs: 'vm'
    })
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
      resolve: {
        resolve: homeResolve
      }
    })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .when('/editable/:_id', {
      templateUrl: 'editable.html',
      controller: 'EditableController',
      controllerAs: 'vm',
      resolve: {
        resolve: editableResolve
      }
    })
    .when('/editable', {
      templateUrl: 'editable-create.html',
      controller: 'EditableCreateController',
      controllerAs: 'vm'
    })
    .when('/user/:_id', {
      templateUrl: 'user.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        resolve: userResolve
      }
    })
    .when('/user', {
      templateUrl: 'user-create.html',
      controller: 'UserCreateController',
      controllerAs: 'vm'
    });
    /**
    * @name homeResolve
    * @desc get content
    * @param {Object} $q $q
    * @param {Object} ncAuthService
    */
    homeResolve.$inject = ['$q', 'ncAuthService',
      'ncEditableService', 'userService'];
    function homeResolve($q, ncAuthService, ncEditableService, userService) {
      return $q.all([
        ncAuthService.authAsync(),
        ncEditableService.query({}).$promise,
        userService.query({}).$promise
      ]);
    }
    /**
    * @name editableResolve
    * @desc get editable
    * @param {Object} $q $q
    * @param {Object} ncAuthService
    */
    editableResolve.$inject = ['$q', '$route', 'ncAuthService',
      'ncEditableService'];
    function editableResolve($q, $route, ncAuthService, ncEditableService) {
      return $q.all([
        ncAuthService.authAsync(),
        ncEditableService.get({_id: $route.current.params._id}).$promise
      ]);
    }
    /**
    * @name userResolve
    * @desc get user
    * @param {Object} $q $q
    * @param {Object} ncAuthService
    */
    userResolve.$inject = ['$q', '$route', 'ncAuthService',
      'userService'];
    function userResolve($q, $route, ncAuthService, userService) {
      return $q.all([
        ncAuthService.authAsync(),
        userService.get({_id: $route.current.params._id}).$promise
      ]);
    }
  }
  /*
  * @name mdConfig
  * @desc configures material design
  * @param {Object} $mdThemingProvider
  */
  mdConfig.$inject = ['$mdThemingProvider'];
  function mdConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .warnPalette('red')
    .backgroundPalette('grey');
  }
  /*
  * @name ncConfig
  * @desc configures narrow cms client
  * @param {Object}
  */
  ncConfig.$inject = ['ncConfigServiceProvider'];
  function ncConfig(ncConfigServiceProvider) {
    ncConfigServiceProvider.setApiRootURI('');
  }
  /**
  * @name routeRun
  * @desc run routes
  * @param {Object} $rootScope
  * @param {Object} $location
  */
  routeRun.$inject = ['$rootScope', '$location'];
  function routeRun($rootScope, $location) {
    $rootScope.$on('$routeChangeError', callback);
    /**
    * @name callback
    * @desc callback for routeChangeError
    * @param {Object} event event
    * @param {Object} current current
    * @param {Object} previous previous
    * @param {Object} rejection rejection
    */
    function callback(event, current, previous, rejection) {
      if (rejection === 401) {
        $location.url('/login');
      } else {
        $location.url('/error');
      }
    }
  }
})();
