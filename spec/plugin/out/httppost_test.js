var post = require('../../../lib/plugin/out/httppost.js'),
    nock = require('nock');

describe('input plugin: http post', function(){
  var mockUrl = "http://test.com";

  it('should be http post successful.', function(done){
    nock(mockUrl).post('/').reply(200);

    var args = {
      "url": mockUrl,
      "body": {
        "json": {"auth_token": "YOUR_AUTH_TOKEN", "current": "%s test"}
      }
    };

    post.output(args, "test", function(err, output){
      err.should.be.false;
      done();
    });
  });
});
