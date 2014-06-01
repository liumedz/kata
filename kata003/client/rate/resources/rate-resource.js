'use strict';

app.factory('rateResource', ['$resource', function($resource) {
    return $resource('/api/rate' );
}]);
