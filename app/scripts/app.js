'use strict';

var app = angular.module('angularMeetupApp', ['ngResource']);

app.config(function($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
//          .when('/band-edit/:id', {
//            templateUrl: 'views/band-edit.html',
//            controller: 'BandEditCtrl'
//          })
      .otherwise({
        redirectTo: '/'
      });
});
