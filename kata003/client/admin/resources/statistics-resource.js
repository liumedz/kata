'use strict';

app.factory('statisticsResource', ['$resource', function($resource) {
    return $resource('/admin/statistics');
}]);
