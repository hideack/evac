var post = require('../../../lib/plugin/out/httpPost.js'),
    nock = require('nock');

describe('input plugin: http post', function(){
  var mockUrl = "http://test.com";

  it('should be http post successful.', function(){
    nock(mockUrl).post('/').reply(200);

    var args = {
      "url": mockUrl,
      "body": {
        "json": {"auth_token": "YOUR_AUTH_TOKEN", "current": "%s"}
      }
    };

    post.output(args, "test");
  });
});
