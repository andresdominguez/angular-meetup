'use strict';

describe('Controller: BandEditCtrl', function() {

  beforeEach(module('angularMeetupApp', 'ControllerTestHelper'));

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  var BandEditCtrl, scope, controller, rootScope, routeParams, theMocks, fake;

  var createController = function(bandId) {
    routeParams.bandId = bandId;

    scope = rootScope.$new();
    BandEditCtrl = controller('BandEditCtrl', {
      $scope: scope
    });
  };

  beforeEach(inject(function($controller, $rootScope, $routeParams, mocks, fakeResource) {
    controller = $controller;
    rootScope = $rootScope;
    routeParams = $routeParams;
    theMocks = mocks;
    fake = fakeResource;
  }));

  it('should load existing band', function() {
    fake.band.whenGetById().returnsDefault();
    fake.album.whenGetList().returnsDefault();
    fake.member.whenGetList().returnsDefault();

    // Given that you load an exiting band.
    createController(123);
    expect(scope.item).toEqualData({});
    expect(scope.albums).toEqual([]);
    expect(scope.members).toEqual([]);

    // When you receive the data.
    fake.flush();

    // Then ensure the scope variables contain the data.
    expect(scope.item).toEqualData(theMocks.band.getById());
    expect(scope.albums.length).toEqual(2);
    expect(scope.members.length).toEqual(3);
  });

  it('should create new band', function() {
    fake.album.whenGetList().returnsDefault();
    fake.member.whenGetList().returnsDefault();
    fake.band.whenCreate().returns({
      id: 1,
      name: 'Beastie boys'
    });

    // Given that you load a new band.
    createController('new');
    fake.flush();

    // When you add a new band.
    scope.item = {
      name: 'Beastie boys'
    };
    scope.saveBand();
    fake.flush();

    // Then ensure the album was created with id 1.
    expect(scope.item).toEqualData({id: 1, name: 'Beastie boys'});
  });

  it('should update an existing band', function() {
    fake.band.whenGetById().returnsDefault();
    fake.album.whenGetList().returnsDefault();
    fake.member.whenGetList().returnsDefault();
    fake.band.whenUpdate().returns();

    // Given that you load an existing band.
    createController(123);
    fake.flush();

    // When you update the band.
    expect(scope.message).toBeUndefined();
    scope.saveBand();
    fake.flush();

    // Then ensure a message is shown.
    expect(scope.message).toEqual('Band updated');
  });
});
