commonControls.directive('smartTableMultiselectFilter', function(){
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            onChecked: '=',
            name: '=',
            caption: '='
        },
        templateUrl: "smart-table-multiselect-filter-template.html",
        controller: function($scope){

            $scope.selectAll = function () {
                 $scope.options.forEach(function(item){
                     $scope.model.push(item);
                });
                $scope.onChecked($scope, true);
            };

            $scope.deselectAll = function() {
                $scope.model.splice(0, $scope.model.length);
                $scope.onChecked($scope, false);
            };

            $scope.setSelectedItem = function(option){

                var index = $scope.model.indexOf(option);

                if(index > -1){
                    $scope.model.splice(index, 1);
                    $scope.onChecked($scope, false);
                }
                else{
                    $scope.model.push(option);
                    $scope.onChecked($scope, true);
                }

                return false;
            };

            $scope.isChecked = function (option) {
                if ($scope.model.indexOf(option) > -1) {
                    return 'glyphicon glyphicon-ok';
                }
                return false;
            };
        }
    }
});