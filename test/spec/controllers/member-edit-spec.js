'use strict';

describe('Controller: MemberEditCtrl', function() {

  beforeEach(module('angularMeetupApp', 'ControllerTestHelper'));

  beforeEach(inject(function(jasmineMatchers) {
    this.addMatchers(jasmineMatchers);
  }));

  var MemberEditCtrl, scope, createController, fake;

  beforeEach(inject(function($controller, $rootScope, $routeParams, fakeResource) {
    fake = fakeResource;

    createController = function(memberId) {
      $routeParams.memberId = memberId;

      scope = $rootScope.$new();
      MemberEditCtrl = $controller('MemberEditCtrl', {
        $scope: scope
      });
    };
  }));


  it('should create a new member', function() {
    fake.member.whenCreate().returns({id: 1});

    // Given that you load the controller to create a new member.
    createController('new');

    // When you save.
    scope.save();

    // Then ensure a new member was created.
    expect(fake.member).toHaveBeenCreated();
  });

  it('should update an existing member', function() {
    fake.member.whenGetById().returnsDefault();
    fake.member.whenUpdate().returns();

    // Given that load an existing member.
    createController(321);
    fake.flush();

    // When you save.
    scope.item.name = 'updated name';
    scope.save();

    // When ensure the member was updated.
    expect(fake.member).toHaveBeenRequested();
    expect(fake.member).toHaveBeenUpdated({name: 'updated name'});
  });
});
