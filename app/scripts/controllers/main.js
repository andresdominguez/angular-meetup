'use strict';

//angular.module('angularMeetupApp', ['ngResource']);

angular.module('angularMeetupApp').
    controller('MainCtrl', function($scope, apiService) {

      apiService.band.query(function(data) {
        debugger;
        $scope.bandList = data;
      });
    });
