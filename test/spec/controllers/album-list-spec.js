'use strict';

describe('Controller: AlbumListCtrl', function() {

  beforeEach(module('angularMeetupApp', 'ControllerTestHelper'));

  beforeEach(inject(function(jasmineMatchers) {
    this.addMatchers(jasmineMatchers);
  }));

  var AlbumListCtrl, scope, createController, fake;

  beforeEach(inject(function($controller, $rootScope, fakeResource) {
    fake = fakeResource;

    createController = function() {
      scope = $rootScope.$new();
      AlbumListCtrl = $controller('AlbumListCtrl', {
        $scope: scope
      });
    };
  }));

  it('should request a list of albums', function() {
    fake.album.whenGetList().returnsDefault();

    // When you create the controller.
    createController();
    expect(scope.list).toEqual([]);
    fake.flush();

    // Then ensure the list of albums was populated.
    expect(scope.list.length).toBe(2);
    expect(fake.album).toHaveBeenRequested();
  });
});
