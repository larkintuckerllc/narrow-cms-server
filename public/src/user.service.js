(function() {
  'use strict';
  angular
    .module('app')
    .factory('userService', service);
  /**
  * @name service
  * @desc Service for users
  * @param {Object} $resource AngularJS $resource object
  * @param {Object} ncAuthService
  */
  service.$inject = ['$resource', 'ncConfigService', 'ncAuthService'];
  function service($resource, ncConfigService, ncAuthService) {
    return $resource(ncConfigService.apiRootURI + 'users/:_id', {}, {
      get: {method: 'GET', params: {_id:'@_id'},
        headers: {Authorization: authorization}},
      save: {method: 'POST',
        headers: {Authorization: authorization}},
      query: {method: 'GET', isArray: true,
        headers: {Authorization: authorization}},
      update: {method: 'PUT', params: {_id:'@_id'},
        headers: {Authorization: authorization}},
      delete: {method: 'DELETE', params: {_id:'@_id'},
        headers: {Authorization: authorization}}
    });
    /**
    * @name authorization
    * @desc Provides authorizaiton header.
    * @return {String} Authorization header.
    */
    function authorization() {
      return 'bearer ' + ncAuthService.getToken();
    }
  }
})();
