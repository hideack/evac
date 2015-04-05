var parser = require('../../../lib/plugin/in/webpageparse.js'),
    nock = require('nock');

describe('input plugin: webpageparse', function(){
  var mockSite1 = "http://test1.hideack";
  var mockSite2 = "http://test2.hideack";

  beforeEach(function() {
    nock(mockSite1).get('/').reply(200, "Hi (test1)");
    nock(mockSite2).get('/').reply(200, "Hi (test2)");
  });

  it('should be get to HTTP contents.', function(done){
    parser.load({url:"http://test1.hideack/"}, function(error, outputs){
      error.should.be.false;
      done();
    });
  });

  it('should be get to any HTTP contents.', function(done){
    parser.load({url:["http://test1.hideack/", "http://test2.hideack/"]}, function(error, outputs){
      error.should.be.false;
      done();
    });
  });

});

