(function() {
  'use strict';
  angular
  .module('app')
  .controller('EditableCreateController', Controller);
  /**
  * @name Controller
  * @desc controller
  * @param {Object} $location $location
  * @param {Object} ncAuthService ncAuthService
  */
  Controller.$inject = ['$window', '$location', 'ncAuthService',
    'ncEditableService'];
  function Controller($window, $location, ncAuthService, ncEditableService) {
    var vm = this;
    vm.logout = logout;
    vm.back = back;
    vm.editable = new ncEditableService({name: '', content: ''});
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
      $location.url('/?tab=editable');
    }
    /**
    * @name save
    * @desc save
    */
    function save() {
      vm.editable.$save().then(success).catch(error);
      /**
      * @name success
      * @desc success
      */
      function success() {
        $location.url('/?tab=editable');
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
