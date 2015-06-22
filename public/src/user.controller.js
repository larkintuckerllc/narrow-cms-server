(function() {
  'use strict';
  angular
  .module('app')
  .controller('UserController', Controller);
  /**
  * @name Controller
  * @desc controller
  * @param {Object} $location $location
  * @param {Object} ncAuthService ncAuthService
  */
  Controller.$inject = ['$window', '$location', 'resolve', 'ncAuthService'];
  function Controller($window, $location, resolve, ncAuthService) {
    var vm = this;
    vm.logout = logout;
    vm.back = back;
    vm.user = resolve[1];
    vm.user.password = '';
    vm.save = save;
    vm.remove = remove;
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
      vm.user.$update().then(success).catch(error);
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
    /**
    * @name remove
    * @desc remove
    */
    function remove() {
      vm.user.$delete().then(success).catch(error);
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
