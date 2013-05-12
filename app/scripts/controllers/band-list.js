'use strict';

angular.module('angularMeetupApp').
    controller('BandListCtrl', function($scope, apiService) {
      apiService.band.query(function(data) {
        $scope.bandList = data;
      });
    });
