(function() {
  'use strict';
  angular
  .module('app')
  .controller('LoginController', Controller);
  /**
  * @name Controller
  * @desc controller
  * @param {Object} $location $location
  * @param {Object} ncAuthService ncAuthService
  */
  Controller.$inject = ['$location', 'ncAuthService'];
  function Controller($location, ncAuthService) {
    var vm = this;
    vm.password = '';
    vm.login = login;
    /**
    * @name login
    * @desc login
    */
    function login() {
      ncAuthService.login('admin',
        vm.password).then(function() {
          $location.url('/');
        });
    }
  }
})();
