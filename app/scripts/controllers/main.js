'use strict';

var app = angular.module('angularMeetupApp');

app.controller('MainCtrl', function($scope, $http) {
  $http.get('http://localhost:3000/wines').success(function(data) {
    $scope.awesomeThings = data;
    console.log('got it');
  });

//  $scope.awesomeThings = [
//    'HTML5 Boilerplate',
//    'AngularJS',
//    'Karma'
//  ];

});
