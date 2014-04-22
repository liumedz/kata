'use strict';

app.factory('customersResource', ['$resource', function($resource) {
    return $resource('/admin/customers/:_id', {id: '@_id'}, {'update': { method: 'PUT' }} );
}]);
