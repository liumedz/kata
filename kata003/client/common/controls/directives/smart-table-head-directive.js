commonControls.directive('smartTableHead', function(){
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'smart-table-head-template.html',
        scope: {
            'dataChanged': '='
        },
        controller: function($scope, $element){
            var pieChartOptions = {
                seriesDefaults: {
                    renderer: jQuery.jqplot.PieRenderer,
                    rendererOptions: {
                        showDataLabels: true
                    }
                },
                legend: { show:true, location: 'e' },
                grid: {background: 'transparent', borderWidth: 0, 'shadow': 0}
            }

            $scope.someData = [[
                ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14],
                ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
            ]];

            $scope.myChartOpts = pieChartOptions;
        }
    }
});