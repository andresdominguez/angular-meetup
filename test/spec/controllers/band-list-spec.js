'use strict';

describe('Controller: BandListCtrl', function() {

  beforeEach(module('angularMeetupApp', 'ControllerTestHelper'));

  beforeEach(inject(function(jasmineMatchers) {
    this.addMatchers(jasmineMatchers);
  }));

  var BandListCtrl, scope, createController, fake;

  beforeEach(inject(function($controller, $rootScope, fakeResource) {
    fake = fakeResource;

    createController = function() {
      scope = $rootScope.$new();
      BandListCtrl = $controller('BandListCtrl', {
        $scope: scope
      });
    };
  }));

  it('should request a list of bands', function() {
    fake.band.whenGetList().returnsDefault();

    createController();
    fake.flush();

    expect(scope.bandList.length).toBe(2);
    expect(fake.band).toHaveBeenRequested();
  });
});
