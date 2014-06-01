'use strict';

app.factory('ratingsResource', ['$resource', function ($resource) {
    return $resource('/api/ratings/:_id', {_id: '@_id'}, {'update': { method: 'PUT' }} );
}]);
