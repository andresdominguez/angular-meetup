'use strict';

ddescribe('Controller: BandEditCtrl', function() {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));
  beforeEach(module('ControllerTestHelper'));

  var BandEditCtrl,
      scope,
      controller,
      rootScope,
      $httpBackend,
      routeParams,
      fake;

  var createController = function() {
    routeParams.bandId = 123;

    scope = rootScope.$new();
    BandEditCtrl = controller('BandEditCtrl', {
      $scope: scope
    });

    $httpBackend.flush();
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams, fakeResource) {
    controller = $controller;
    rootScope = $rootScope;
    $httpBackend = _$httpBackend_;
    routeParams = $routeParams;
    fake = fakeResource;
  }));

  it('It should read band and members', function() {
    var band = {
      name: 'Wu-Tang Clan',
      albums: [],
      members: []
    };

    var members = [
      {name: 'Method Man'},
      {name: 'Ghostface Killah'}
    ];

    $httpBackend.whenGET('/bands/123').respond(band);
    $httpBackend.whenGET('/members').respond(members);

    createController();

    expect(scope.item.name).toBe('Wu-Tang Clan');
    expect(scope.members.length).toBe(2);
  });

  it('should use the fake resource', function() {
    fake.band.whenGetById().returnsDefault()
    fake.member.whenGetList().returnsDefault();

    var band = {
      name: 'Wu-Tang Clan',
      albums: [],
      members: []
    };

    createController();

    expect(scope.item.name).toBe('Wu-Tang Clan');
    expect(scope.members.length).toBe(2);
  });
});
