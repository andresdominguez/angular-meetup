'use strict';

describe('Controller: MemberEditCtrl', function () {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var MemberEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MemberEditCtrl = $controller('MemberEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
