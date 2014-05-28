'use strict';

statistics.controller('statisticsController', ['$scope', '$location', '$q', '$timeout', 'statisticsService', function ($scope, $location, $q, $timeout, statisticsService) {

    $scope.dataSource = statisticsService.dataSource;

    var now = new Date();
    var firstDayPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    var rows;

    $scope.dateFilter = {
        fromDate: firstDayPrevMonth,
        toDate: now
    };

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
        if ($scope.someData[0].length === 0) {
            $scope.someData = [[['', 0]]];
        }
    };

    var JSON2CSV = function(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

//        "c": 6,
//            "customerName": "AB Lietuvos paštas",
//            "customerCode": "1212 15587",
//            "customerAddress": "J. Jasinskio g. 16, 03500 Vilnius",
//            "d": 70,
//            "departmentName": "Paypost",
//            "departmentCode": "22407",
//            "departmentAddress": "Architektų g. 19 (prie PC \"Rimi\"), Vilnius\r",
//            "o": 1,
//            "objectName": "Plakatas",
//            "r": 1,
//            "created": "2014-04-03T22:17:49.604Z",
//            "clientInfo": {
        var str = '';
        var line = '';
        for (var i = 0; i < array.length; i++) {
            var line = array[i]['c'] + '\t'
                + array[i]['customerName'] + '\t'
                + array[i]['customerCode'] + '\t'
                + array[i]['customerAddress'] + '\t'
                + array[i]['d'] + '\t'
                + array[i]['departmentName'] + '\t'
                + array[i]['departmentAddress'] + '\t'
                + array[i]['o'] + '\t'
                + array[i]['objectName'] + '\t'
                + array[i]['created'] + '\t'
                + array[i]['r'] + '\t'
                + array[i]['ratingName'] + '\t'
                + JSON.stringify(array[i]['clientInfo'])  + '\t';

            str += line + '\r\n';
        }

        return str;

    }

    $scope.myChartOpts = pieChartOptions;

    $scope.tableDataLoaded = function (tableData) {
        $scope.details = [];
        tableData.columns.forEach(function (column) {
            if (column.checkItems.length === 1) {
                $scope.details.push({ name: column.title, value: column.checkItems[0].name });
            }
        });
        rows = tableData.rows;
        calculatePieCharData(tableData.rows, 'ratingName');
    };

    $scope.load = function(){
        $scope.dataSource = statisticsService.dataSource;
        statisticsService.load({fromDate: $scope.dateFilter.fromDate.toISOString(), toDate: $scope.dateFilter.toDate.toISOString()});
    };


    $scope.export = function(){
        var csv = JSON2CSV(rows);
        window.open(encodeURI("data:text/csv;charset=utf-8," + (csv)));
    }


    $scope.load()

}]);