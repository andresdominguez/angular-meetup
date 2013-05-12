'use strict';

angular.module('angularMeetupApp').controller('BandEditCtrl',
    function($scope, $routeParams, apiService) {
      var bandId = $routeParams.bandId;

      apiService.band.get({id: bandId}, function(data) {
        $scope.item = data;
      })
    });
