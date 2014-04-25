'use strict';

app.factory('ratingsResource', ['$resource', function ($resource) {
    return $resource('/api/ratings');
}]);
