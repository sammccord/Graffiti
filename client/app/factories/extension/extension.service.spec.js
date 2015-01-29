'use strict';

describe('Service: extension', function () {

  // load the service's module
  beforeEach(module('graffitiApp'));

  // instantiate service
  var extension;
  beforeEach(inject(function (_extension_) {
    extension = _extension_;
  }));

  it('should do something', function () {
    expect(!!extension).toBe(true);
  });

});
