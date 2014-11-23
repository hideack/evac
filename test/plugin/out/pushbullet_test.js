var pushbullet = require('../../../lib/plugin/out/pushbullet.js'),
    nock = require('nock');

var API_BASE       = 'https://api.pushbullet.com',
    PUSH_END_POINT = '/v2/pushes';

describe('output plugin: pushbullet', function(){
  it('should be PushBullet successful.', function(done){
    nock(API_BASE).post(PUSH_END_POINT).reply(200);

    var args = {
      "device": "hideack99@gmail.com",
      "token" : "****",
      "title": "output plugin test",
      "mode": "link"
    };

    pushbullet.output(args, "test", function(err, output){
      err.should.be.false;
      done();
    });
  });

  it('should be raise error if set invalid mode parameter.', function(done){
    var args = {
      "device": "hideack99@gmail.com",
      "token" : "****",
      "title": "output plugin test",
      "mode": "xlink"
    };

    pushbullet.output(args, "test", function(err, output){
      err.should.be.not.false;
      done();
    });
  });

});
