'use strict';

angular.module('angularMeetupApp').factory('jasmineMatchers', function() {

  /**
   * Ensure the spy for the resource method ws created. It will add an error
   * message when you don't have a spy.
   *
   * @param {!Object} scope A reference to the jasmine's 'this'.
   * @param {Object} spy The spy on the resource method.
   * @returns {boolean} False when the spy is not defined.
   */
  var verifySpy = function(scope, spy) {
    if (!spy) {
      scope.message = function() {
        return 'You did not set a when or expect for the resource';
      };
      return false;
    }
    return true;
  };

  return {
    toEqualData: function(expected) {
      return angular.equals(this.actual, expected);
    },
    toHaveBeenRequested: function() {
      var spy = this.actual.getSpy();
      if (!verifySpy(this, spy)) {
        return false;
      }

      return spy.callCount > 0;
    },
    toHaveBeenCreated: function() {
      var spy = this.actual.getCreateSpy();
      if (!verifySpy(this, spy)) {
        return false;
      }

      var wasCalled = spy.callCount > 0;

      if (!wasCalled) {
        this.message = function() {
          return 'The item was not created';
        };
      }

      return  wasCalled;
    },
    toHaveBeenUpdated: function() {
      var spy = this.actual.getUpdateSpy();
      if (!verifySpy(this, spy)) {
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
      if (!verifySpy(this, spy)) {
        return false;
      }

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
