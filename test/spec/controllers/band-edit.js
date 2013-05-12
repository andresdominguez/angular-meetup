'use strict';

ddescribe('Controller: BandEditCtrl', function() {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var BandEditCtrl,
      scope,
      controller,
      rootScope,
      $httpBackend,
      routeParams;

  var createController = function() {
    routeParams.bandId = 123;

    scope = rootScope.$new();
    BandEditCtrl = controller('BandEditCtrl', {
      $scope: scope
    });

    $httpBackend.flush();
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams) {
    controller = $controller;
    rootScope = $rootScope;
    $httpBackend = _$httpBackend_;
    routeParams = $routeParams;
  }));

  it('should attach a list of awesomeThings to the scope', function() {
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
});
