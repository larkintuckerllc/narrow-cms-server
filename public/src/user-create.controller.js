(function() {
  'use strict';
  angular
  .module('app')
  .controller('UserCreateController', Controller);
  /**
  * @name Controller
  * @desc controller
  * @param {Object} $location $location
  * @param {Object} ncAuthService ncAuthService
  */
  Controller.$inject = ['$window', '$location', 'ncAuthService',
    'userService'];
  function Controller($window, $location, ncAuthService, userService) {
    var vm = this;
    vm.logout = logout;
    vm.back = back;
    vm.user = new userService({username: '', password: ''});
    vm.save = save;
    /**
    * @name logout
    * @desc logout
    */
    function logout() {
      ncAuthService.logout();
      $location.url('/login');
    }
    /**
    * @name back
    * @desc back
    */
    function back() {
      $location.url('/?tab=users');
    }
    /**
    * @name save
    * @desc save
    */
    function save() {
      vm.user.$save().then(success).catch(error);
      /**
      * @name success
      * @desc success
      */
      function success() {
        $location.url('/?tab=users');
      }
      /**
      * @name error
      * @desc error
      */
      function error() {
        $location.url('/error');
      }
    }
  }
})();
