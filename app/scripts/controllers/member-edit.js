'use strict';

angular.module('angularMeetupApp')
    .controller('MemberEditCtrl', function($scope, $routeParams, apiService) {

      apiService.member.get({id: $routeParams.memberId}, function(data) {
        $scope.item = data;
      })
    });
