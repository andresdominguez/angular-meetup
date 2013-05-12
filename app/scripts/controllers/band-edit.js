'use strict';

angular.module('angularMeetupApp').controller('BandEditCtrl',
    function($scope, $routeParams, apiService) {
      var bandId = $routeParams.bandId;

      $scope.addMember = function() {
        $scope.item.members.push($scope.selectedMember);
      };

      apiService.band.get({id: bandId}, function(data) {
        $scope.item = data;
      });

      apiService.member.query({}, function(data) {
        $scope.members = data;
      });
    });
