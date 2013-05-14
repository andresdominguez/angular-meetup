'use strict';

angular.module('angularMeetupApp')
    .factory('jasmineMatchers', function() {

      return {
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        },
        toHaveBeenRequested: function(expected) {
          var spy = this.actual.getSpy();
          return spy.callCount > 0;
        }
      };
    });
