'use strict';

describe('Controller: MemberListCtrl', function () {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var MemberListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MemberListCtrl = $controller('MemberListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
