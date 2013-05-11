'use strict';

angular.module('angularMeetupApp', [])
    .config(function($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .when('/menuItem/:id', {
            templateUrl: 'views/view-ingredient.html',
            controller: 'ViewIngredientCtrl'
          })
          .when('/band-edit/:id', {
            templateUrl: 'views/band-edit.html',
            controller: 'BandEditCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    });
