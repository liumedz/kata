'use strict';


app.controller('statisticsController', ['$scope', '$location', '$q', '$timeout', 'statisticsService', function ($scope, $location, $q, $timeout, statisticsService) {

    $scope.dataSource = statisticsService.dataSource;

    var pieChartOptions = {
        seriesDefaults: {
            renderer: jQuery.jqplot.PieRenderer,
            rendererOptions: {
                showDataLabels: true
            }
        },
        legend: { show: true, location: 'e' },
        grid: { background: 'transparent', borderWidth: 0, 'shadow': 0 }
    };

    var calculatePieCharData = function (rows, column) {
        $scope.someData = [[]];
        rows.forEach(function (row) {
            if (row.visibility !== 'collapse') {
                var value = row[column];
                var index = -1;

                $scope.someData[0].forEach(function (item, itemIndex) {
                    if (value === item[0]) {
                        index = itemIndex;
                    }
                });

                if (index === -1) {
                    $scope.someData[0].push([value, 1]);
                } else {
                    $scope.someData[0][index][1]++;
                }
            }
        });
    };

    $scope.myChartOpts = pieChartOptions;

    $scope.tableDataLoaded = function (tableData) {
        $scope.details = [];
        tableData.columns.forEach(function (column) {
            if (column.checkItems.length === 1) {
                $scope.details.push({ name: column.title, value: column.checkItems[0].name });
            }
        });
        calculatePieCharData(tableData.rows, 'ratingName');
    };

}]);