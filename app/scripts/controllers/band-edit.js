'use strict';

angular.module('angularMeetupApp')
    .controller('BandEditCtrl', function($scope, $routeParams, $http) {
      var fetchBand = function() {

      };
      var id = $routeParams.id;

      if (id === 'new') {

      } else {
      }

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
