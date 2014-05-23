commonControls.filter('smartTableDateFilter', ['$filter', function ($filter) {
    return function (input) {
        if(angular.isDate(input)){
            return $filter('date')(input, 'longDate');
        }
        return input;
    };
}]);