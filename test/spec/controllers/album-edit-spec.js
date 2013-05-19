'use strict';

ddescribe('Controller: AlbumEditCtrl', function() {

  beforeEach(module('angularMeetupApp', 'ControllerTestHelper'));

  beforeEach(inject(function(jasmineMatchers) {
    this.addMatchers(jasmineMatchers);
  }));

  var AlbumEditCtrl, scope, controller, rootScope, routeParams, theMocks, fake;

  var createController = function(albumId) {
    routeParams.albumId = albumId;

    scope = rootScope.$new();
    AlbumEditCtrl = controller('AlbumEditCtrl', {
      $scope: scope
    });
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $routeParams, mocks, fakeResource) {
    controller = $controller;
    rootScope = $rootScope;
    routeParams = $routeParams;
    theMocks = mocks;
    fake = fakeResource;
  }));

  it('should create a new album', function() {
    fake.album.whenCreate().returns({id: 123});

    // Given that you load the controller for a new item.
    createController('new');

    // When you save the item.
    scope.save();

    // Then ensure a new album was created.
    expect(fake.album).toHaveBeenCreated();
  });

  it('should update an exiting album', function() {
    fake.album.whenGetById().returnsDefault();
    fake.album.whenUpdate().returns();

    // Given that you load an existing album.
    createController(123);
    fake.flush();

    // When you save the album with a new name.
    scope.item.name = 'updated name';
    scope.save();

    // Then ensure the album was updated.
    expect(fake.album).toHaveBeenUpdatedWith({name: 'updated name'});
  });
});
