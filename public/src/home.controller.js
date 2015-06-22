(function() {
  'use strict';
  angular
  .module('app')
  .controller('HomeController', Controller);
  /**
  * @name Controller
  * @desc controller
  * @param {Object} $location $location
  * @param {Object} ncAuthService ncAuthService
  */
  Controller.$inject = ['$location', '$routeParams',
    'resolve', 'ncAuthService'];
  function Controller($location, $routeParams, resolve, ncAuthService) {
    var vm = this;
    vm.tabSelected = 0;
    if ($routeParams.tab === 'users') {
      vm.tabSelected = 1;
    }
    vm.logout = logout;
    vm.editables = resolve[1];
    vm.users = resolve[2];
    vm.editEditable = editEditable;
    vm.editUser = editUser;
    vm.create = create;
    /**
    * @name logout
    * @desc logout
    */
    function logout() {
      ncAuthService.logout();
      $location.url('/login');
    }
    /**
    * @name editEditable
    * @desc edit editable
    * @param {Object} editable
    */
    function editEditable(editable) {
      $location.url('/editable/' + editable._id);
    }
    /**
    * @name editUser
    * @desc edit user
    * @param {Object} editable
    */
    function editUser(user) {
      $location.url('/user/' + user._id);
    }
    /**
    * @name create
    * @desc create
    */
    function create() {
      if (vm.tabSelected === 0) {
        $location.url('/editable');
      } else {
        $location.url('/user');
      }
    }
  }
})();
