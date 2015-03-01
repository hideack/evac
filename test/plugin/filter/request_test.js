var request = require('../../../lib/plugin/filter/request.js'),
    nock = require('nock');

describe('filter plugin: request', function(){
  var mockUrl = "http://test-request.com/";

  beforeEach(function() {
    var testBody = "Hello, world.\n";
    nock(mockUrl).get('/').reply(200, testBody);
  });

  it('should be able to read from body.', function(done){
    request.filter({}, mockUrl, function(err, word) {
      err.should.be.false;
      word.should.equal("Hello, world.\n");
      done();
    });
  });

  it('should be able to read from status code.', function(done){
    request.filter({format: "__code__"}, mockUrl, function(err, word) {
      err.should.be.false;
      word.should.equal("200");
      done();
    });
  });

  it('should be able to read from body & status code with format strings.', function(done){
    request.filter({format: "__body__\n__code__"}, mockUrl, function(err, word) {
      err.should.be.false;
      word.should.equal("Hello, world.\n\n200");
      done();
    });
  });
});
