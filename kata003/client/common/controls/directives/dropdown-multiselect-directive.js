commonControls.directive('dropdownMultiselect', function(){
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            onChecked: '=',
            name: '='
        },
        template: "<div class='btn-group' data-ng-class='{open: open}'>"+
            "<button class='btn btn-small'>Select</button>"+
            "<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;'><span class='caret'></span></button>"+
            "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
            "<li><a data-ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
            "<li><a data-ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
            "<li class='divider'></li>" +
            "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem(option)'>{{option.name}}<span data-ng-class='isChecked(option)'></span></a></li>" +
            "</ul>" +
            "</div>" ,
        controller: function($scope){

            $scope.selectAll = function () {
                 $scope.options.forEach(function(item){
                     $scope.model.push(item);
                });
                $scope.onChecked($scope);
            };

            $scope.deselectAll = function() {
                $scope.model.splice(0, $scope.model.length);
                $scope.onChecked($scope);
            };

            $scope.setSelectedItem = function(option){

                var index = $scope.model.indexOf(option);

                if(index > -1){
                    $scope.model.splice(index, 1);
                }
                else{
                    $scope.model.push(option);
                }
                $scope.onChecked($scope);
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