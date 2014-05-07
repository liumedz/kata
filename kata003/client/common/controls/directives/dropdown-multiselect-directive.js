commonControls.directive('dropdownMultiselect', function(){
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            pre_selected: '=preSelected',
            onChecked: '='
        },
        template: "<div class='btn-group' data-ng-class='{open: open}'>"+
            "<button class='btn btn-small'>Select</button>"+
            "<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;openDropdown()'><span class='caret'></span></button>"+
            "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
            "<li><a data-ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
            "<li><a data-ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
            "<li class='divider'></li>" +
            "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></a></li>" +
            "</ul>" +
            "</div>" ,
        controller: function($scope){

            $scope.openDropdown = function(){
                $scope.selected_items = [];
                for(var i=0; i<$scope.pre_selected.length; i++){                        $scope.selected_items.push($scope.pre_selected[i].id);
                }
            };

            $scope.selectAll = function () {
                $scope.model = _.pluck($scope.options, 'id');
                $scope.onChecked();
            };
            $scope.deselectAll = function() {
                $scope.model=[];
                $scope.onChecked();
            };
            $scope.setSelectedItem = function(){
                var id = this.option.id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                } else {
                    $scope.model.push(id);
                }
                $scope.onChecked();
                return false;
            };
            $scope.isChecked = function (id) {
                if (_.contains($scope.model, id)) {
                    return 'glyphicon glyphicon-ok';
                }
                return false;
            };
        }
    }
});