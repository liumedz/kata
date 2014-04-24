'use strict';


app.controller('statisticsController', ['$scope', '$location', 'statisticsResource', function ($scope, $location, statisticsResource) {

    var load = function() {
        $scope.statistics = statisticsResource.query();
    };

    load();

}]);