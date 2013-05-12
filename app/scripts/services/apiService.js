'use strict';

angular.module('angularMeetupApp').
    factory('apiService', function($resource) {
      var band = $resource('/bands/:id', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });

      return {
        band: band
      };
    });
