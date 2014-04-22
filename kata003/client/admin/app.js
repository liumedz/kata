'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(['$routeProvider' , '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/admin',
        {
            templateUrl: "overview-template.html",
            controller: 'overviewController'
        });
    $routeProvider.when('/admin/users',
        {
            templateUrl: "users-template.html",
            controller: 'usersController'
        });
    $routeProvider.when('/admin/customers',
        {
            templateUrl: "customers-template.html",
            controller: 'customersController'
        });

    $routeProvider.otherwise({redirectTo: '/admin'});

}]);


