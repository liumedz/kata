'use strict';


app.controller('statisticsController', ['$scope', '$location', '$q', '$timeout', 'ngTableParams', 'statisticsResource', function ($scope, $location, $q, $timeout, ngTableParams, statisticsResource) {

    $scope.statistics = statisticsResource.query();
    $scope.columns = [  {name: 'column1', title: 'column1'},
                        {name: 'column2', title: 'column2'},
                        {name: 'column3', title: 'column3'}];
    $scope.rows = [
            {column1: "column1Data", column2: "column2Data", column3: "column3Data"},
            {column1: "column1Data", column2: "column2Data", column3: "column3Data"},
            {column1: "column1Data", column2: "column2Data", column3: "column3Data"}
    ];

}]);