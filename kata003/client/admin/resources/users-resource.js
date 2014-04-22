'use strict';

app.factory('usersResource', ['$resource', function($resource) {
    return $resource('/admin/users/:_id', {id: '@_id'}, {'update': { method: 'PUT' }} );
}]);
