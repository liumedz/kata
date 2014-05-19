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

    $scope.someData = [[
        ['Heavy Industry', 12], ['Retail', 9], ['Light Industry', 14],
        ['Out of home', 16], ['Commuting', 7], ['Orientation', 9]
    ]];

    $scope.myChartOpts = pieChartOptions;

    $scope.tableDataLoaded = function (tableData) {
        $scope.details = [];
        tableData.columns.forEach(function (column) {
            if (column.checkItems.length < 2) {
                $scope.details.push({ name: column.title, value: column.checkItems[0].name });
            }
        });
    };

}]);