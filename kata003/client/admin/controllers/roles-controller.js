'use strict';

app.controller('rolesController', ['$scope', '$location' , '$routeParams', 'rolesResource', 'permissionsResource', function ($scope, $location, $routeParams, rolesResource, permissionsResource) {

    var load = function() {
        rolesResource.query({ _id: $routeParams._id }).$promise.then(function(roles) {
            $scope.roles = roles;
            selectFirst();
            loadPermissions();
        });
    };

    var selectFirst = function() {
        if ($scope.roles.length > 0) {
            $scope.role = $scope.roles[0];
        } else {
            $scope.roles.push({});
        }
        $scope.role = $scope.roles[0];
    };

    var loadPermissions = function(){
        permissionsResource.query().$promise.then(function(permissions){
            $scope.permissions = permissions;
        });
    };

    $scope.onAdd = function(){
        $scope.role = {};
        $scope.roles.push($scope.role);
    };

    $scope.onSave = function(role){
        if(!role._id){
            rolesResource.save(role);
        }
        else{
            var _id = role._id;
            delete role._id;
            rolesResource.update({ _id: _id }, role);
        }
        load()
    };

    $scope.onEdit = function(role){
        $scope.role = role;
    };

    $scope.onDelete = function(role){
        rolesResource.delete({ _id: role._id });
        load();
    };

    $scope.isAssignedPermission = function(permission){
        if($scope.role.permissions){
            return $scope.role.permissions.filter(function(item){
                return item === permission;
            }).length > 0;
        }
        else{
            return false;
        }
    };

    $scope.onAssignPermission = function (permission) {

        if(!$scope.role.permissions){
            $scope.role.permissions = [];
        }

        var index = $scope.role.permissions.indexOf(permission);
        if(index > -1){
            $scope.role.permissions.splice(index, 1);
        }
        else{
            $scope.role.permissions.push(permission);
        }

        var _id = $scope.role._id;
        delete $scope.role._id;
        rolesResource.update({ _id: _id }, $scope.role);

        load();
    };

    load();

}]);