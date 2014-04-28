'use strict';

app.factory('rolesResource', ['$resource', function($resource) {
    return $resource('/api/roles/:_id', {id: '@_id'}, {'update': { method: 'PUT' }} );
}]);
