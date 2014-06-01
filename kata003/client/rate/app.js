'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap']);

app.config(['$routeProvider' , '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/r',
        {
            templateUrl: "rate-template.html",
            controller: 'rateController'
        });

}]);


