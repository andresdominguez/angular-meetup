'use strict';

describe('Controller: MemberListCtrl', function() {

  beforeEach(module('angularMeetupApp', 'ControllerTestHelper'));

  beforeEach(inject(function(jasmineMatchers) {
    this.addMatchers(jasmineMatchers);
  }));

  var MemberListCtrl, scope, createController, fake;

  beforeEach(inject(function($controller, $rootScope, fakeResource) {
    fake = fakeResource;

    createController = function() {
      scope = $rootScope.$new();
      MemberListCtrl = $controller('MemberListCtrl', {
        $scope: scope
      });
    };
  }));

  it('should get a list of members', function() {
    // Expect the controller to fetch a list of members.
    fake.member.whenGetList().returnsDefault();

    // When you create the controller.
    createController();

    // Nothing yet because the response has not arrived.
    expect(scope.list).toBeUndefined();
    fake.flush();

    // Then ensure the member list got populated.
    expect(scope.list.length).toBe(3);
  });
});
