describe('UserService', function () {

  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Unmi', last_name: 'Gong', email: 'UG@ong.com'})
  }))

  it('should get the current user information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.first_name === 'Unmi' && data.last_name === 'Gong' && data.email === 'UG@ong.com'){
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should create fullname of user', function(){
    expect(UserService.createFullName({first_name: 'Unmi', last_name: 'Gong'})).toEqual('Unmi Gong');
  });

});

