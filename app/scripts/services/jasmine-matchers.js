'use strict';

angular.module('angularMeetupApp').factory('jasmineMatchers', function() {

  return {
    toEqualData: function(expected) {
      return angular.equals(this.actual, expected);
    },
    toHaveBeenRequested: function() {
      var spy = this.actual.getSpy();
      if (!spy) {
        this.message = function() {
          return 'You did not set a when or expect for the resource';
        };
        return false;
      }
      return spy.callCount > 0;
    },
    toHaveBeenCreated: function() {
      var spy = this.actual.getCreateSpy();
      if (!spy) {
        this.message = function() {
          return 'You did not set a when or expect for the resource';
        };
        return false;
      }

      var wasCalled = spy.callCount > 0;

      if (!wasCalled) {
        this.message = function() {
          return 'The resource was not created';
        };
      }

      return  wasCalled;
    },
    toHaveBeenUpdated: function() {
      var spy = this.actual.getUpdateSpy();
      if (!spy) {
        this.message = function() {
          return 'You did not set a when or expect for the resource';
        };
        return false;
      }

      var wasCalled = spy.callCount > 0;

      if (!wasCalled) {
        this.message = function() {
          return 'The resource was not updated';
        };
      }

      return  wasCalled;
    },
    toHaveBeenUpdatedWith: function(expected) {
      var spy = this.actual.getUpdateSpy();

      var item = spy.mostRecentCall.args[1];

      var allPropertiesMatch = _.all(expected, function(value, key) {
        return angular.equals(value, item[key]);
      });

      if (!allPropertiesMatch) {
        this.message = function() {
          return 'Expected ' + JSON.stringify(item) + ' to match ' + JSON.stringify(expected);
        };
      }

      return allPropertiesMatch;
    }
  };
});
