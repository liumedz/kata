'use strict';

app.factory('claimsResource', ['$resource', function ($resource) {
    return $resource('/api/claims');
}]);
