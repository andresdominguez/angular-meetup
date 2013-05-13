'use strict';

angular.module('angularMeetupApp')
    .controller('MemberEditCtrl', function($scope, $routeParams, apiService, $location) {

      var memberId = $routeParams.memberId;

      apiService.member.get({id: memberId}, function(data) {
        $scope.item = data;
      });

      $scope.delete = function() {
        apiService.member.delete({id: memberId}, function() {
          $location.path('/member-list');
        });
      };

      $scope.save = function() {

      };
    });
