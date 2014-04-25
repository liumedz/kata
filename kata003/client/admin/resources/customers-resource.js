'use strict';

app.factory('customersResource', ['$resource', function($resource) {
    return $resource('/api/customers/:_id', {id: '@_id'}, {'update': { method: 'PUT' }} );
}]);
