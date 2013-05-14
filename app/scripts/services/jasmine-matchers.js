'use strict';

angular.module('angularMeetupApp')
    .factory('jasmineMatchers', function() {

      return {
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        },
        toHaveBeenRequested: function(expected) {
          var spy = this.actual.getSpy();
          if(!spy) {
            this.message = function() {
              return 'You did not set a when or expect for the resource';
            };
            return false;
          }
          return spy.callCount > 0;
        },
        toHaveBeenCreated: function(expected) {
          var spy = this.actual.getCreateSpy();
          if(!spy) {
            this.message = function() {
              return 'You did not set a when or expect for the resource';
            };
            return false;
          }
          return spy.callCount > 0;
        },
        toHaveBeenUpdated: function(expected) {
          var spy = this.actual.getUpdateSpy();
          if(!spy) {
            this.message = function() {
              return 'You did not set a when or expect for the resource';
            };
            return false;
          }
          return spy.callCount > 0;
        }
      };
    });
