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
  Controller.$inject = ['$location', 'resolve', 'ncAuthService'];
  function Controller($location, resolve, ncAuthService) {
    var vm = this;
    vm.logout = logout;
    vm.editables = resolve[1];
    vm.editEditable = editEditable;
    vm.createEditable = createEditable;
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
    * @name createEditable
    * @desc create editable
    */
    function createEditable() {
      $location.url('/editable');
    }
  }
})();
