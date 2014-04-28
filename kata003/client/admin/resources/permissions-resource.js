'use strict';

app.factory('permissionsResource', ['$resource', function ($resource) {
    return $resource('/api/permissions');
}]);
