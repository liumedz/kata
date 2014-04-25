'use strict';

app.factory('usersResource', ['$resource', function($resource) {
    return $resource('/api/users/:_id', {id: '@_id'}, {'update': { method: 'PUT' }} );
}]);
