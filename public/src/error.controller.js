(function() {
  'use strict';
  angular
  .module('app')
  .controller('ErrorController', Controller);
  /**
  * @name Controller
  * @desc controller
  * @param {Object} $window
  */
  Controller.$inject = ['$window'];
  function Controller($window) {
    var vm = this;
    vm.reload = reload;
    /**
    * @name reload
    * @desc reload
    */
    function reload() {
      $window.location.assign($window.location.pathname);
    }
  }
})();
