'use strict';

app.controller('analyticsController', [ '$scope', '$location', '$window', function ($scope, $location, $window) {

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

        if(menu.url === '/logout'){
            $window.location.href = menu.url;
        }

        $location.url(menu.url);
    }

}]);