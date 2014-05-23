'use strict';

app.controller('analyticsController', [ '$scope', '$location', function ($scope, $location) {

    var deselectMenu = function(){
        $scope.mainMenus.forEach(function(item){
            item.active = '';
        });
    }

    // $scope.mainMenus =  [{title: 'Overview', url: '/admin', active: 'active'}, {title: 'Users', url: '/admin/users'}, {title: 'Logout'}]
    $scope.mainMenus =  global.mainMenus;

    $scope.onClick = function(menu){
        deselectMenu();
        menu.active = 'active';
        $location.url(menu.url);
    }

}]);