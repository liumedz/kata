commonControls.directive('dropdownMultiselect', function(){
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            onChecked: '='
        },
        template: "<div class='btn-group' data-ng-class='{open: open}'>"+
            "<button class='btn btn-small'>Select</button>"+
            "<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;'><span class='caret'></span></button>"+
            "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
            "<li><a data-ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
            "<li><a data-ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
            "<li class='divider'></li>" +
            "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></a></li>" +
            "</ul>" +
            "</div>" ,
        controller: function($scope){

            $scope.selectAll = function () {
                 $scope.options.forEach(function(item){
                     $scope.model.push(item.id);
                });
                $scope.onChecked();
            };

            $scope.deselectAll = function() {
                $scope.model.splice(0, $scope.model.length)
                $scope.onChecked();
            };

            $scope.setSelectedItem = function(){
                var id = this.option.id;
                var filtered = $scope.model.filter(function(item){
                    return item === id;
                });
                if(filtered.length > 0){
                    var index = $scope.model.indexOf(id);
                    $scope.model.splice(index, 1);
                }
                else{
                    $scope.model.push(id);
                }
                $scope.onChecked();
                return false;
            };

            $scope.isChecked = function (id) {
                if ($scope.model.indexOf(id) > -1) {
                    return 'glyphicon glyphicon-ok';
                }
                return false;
            };
        }
    }
});