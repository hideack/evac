var yo = require('../../../lib/plugin/out/yo.js'),
    nock = require('nock');

describe('output plugin: yo', function(){
  it('should be Yo successful.', function(done){
    nock("http://api.justyo.co").post('/yoall/').reply(200);

    var args = {
      "api_token": "foobar"
    };

    yo.output(args, "test", function(err, output){
      err.should.be.false;
      done();
    });
  });

  it('should be Yo fail.', function(done){
    nock("http://api.justyo.co").post('/yoall/').reply(400);

    var args = {
      "api_token": "foobar"
    };

    yo.output(args, "test", function(err, output){
      err.should.be.not.false;
      done();
    });
  });

});
