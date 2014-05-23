'use strict';

statistics.factory('statisticsResource', ['$resource', function($resource) {
    return $resource('/api/statistics');
}]);
