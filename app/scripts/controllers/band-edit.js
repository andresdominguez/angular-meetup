'use strict';

angular.module('angularMeetupApp').controller('BandEditCtrl',
    function($scope, $routeParams, apiService) {
      var bandId = $routeParams.bandId;

      $scope.addMember = function() {
        $scope.item.members.push($scope.selectedMember);
      };

      $scope.saveBand = function() {
        var item = angular.copy($scope.item);
        var id = item._id;
        delete item._id;

        apiService.band.update(
            {id: id},
            item,
            function(a, b, c) {
              debugger;
            }, function(a, b, c) {
              $scope.error = a.data;
            });
      };

      apiService.band.get({id: bandId}, function(data) {
        $scope.item = data;
      });

      apiService.member.query({}, function(data) {
        $scope.members = data;
      });
    });
