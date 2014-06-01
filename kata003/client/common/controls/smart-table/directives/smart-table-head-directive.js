commonControls.directive('smartTableHead', [ function(){
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'smart-table-head-template.html',
        scope: {
            'dataChanged': '='
        },
        controller: function ($scope, $element) {

        }
    };
}]);