'use strict';

var app = angular.module('angularMeetupApp', ['ngResource']);

app.config(function($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/band-list.html',
        controller: 'BandListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});
