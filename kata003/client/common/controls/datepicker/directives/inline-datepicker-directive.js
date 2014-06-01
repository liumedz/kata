commonControls.directive('inlineDatepicker', [function(){
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'inline-datepicker-template.html',
        scope: {
            ngModel: '='
        },
        controller: function ($scope) {

            $scope.clear = function () {
                $scope.ngModel = null;
            };

            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };

            $scope.toggleMin();

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };

            $scope.dateOptions = {};

            $scope.initDate = new Date('2016-15-20');
            $scope.format = 'shortDate';
        }
    };
}]);