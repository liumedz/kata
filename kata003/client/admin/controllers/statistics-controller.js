'use strict';


app.controller('statisticsController', ['$scope', '$location', '$q', '$timeout', 'ngTableParams', 'statisticsService', function ($scope, $location, $q, $timeout, ngTableParams, statisticsService) {

    $scope.dataSource = statisticsService.dataSource;

}]);