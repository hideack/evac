var slack = require('../../../lib/plugin/out/slack.js'),
    nock = require('nock');

describe('output plugin: slack', function(){
  var mockDomain = "https://hooks.slack.com";
  var mockUrl = "https://hooks.slack.com/services/1/2/3";

  it('should be successful call to slack incomming API.', function(done){
    nock(mockDomain).post('/services/1/2/3').reply(200);

    var args = {
      "url": mockUrl,
      "text": "Hi"
    };

    slack.output(args, "test", function(err, output){
      err.should.be.false;
      done();
    });
  });

  it('should be fail call to slack incoming API.', function(done){
    nock(mockDomain).post('/services/1/2/3').reply(500);

    var args = {
      "url": mockUrl,
      "text1": "Hi"
    };

    slack.output(args, "test", function(err, output){
      err.should.be.true;
      done();
    });
  });

  it('should be format text.', function(done){
    nock(mockDomain).post('/services/1/2/3').reply(200);

    var args = {
      "url": mockUrl,
      "text": "world",
      "format": "Hello __word__"
    };

    slack.output(args, "world", function(err, output){
      err.should.be.false;
      output.should.be.equal("Hello world");
      done();
    });
  });


});
