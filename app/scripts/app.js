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
          .otherwise({
            redirectTo: '/'
          });
    });
