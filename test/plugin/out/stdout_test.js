var stdout = require('../../../lib/plugin/out/stdout.js');

describe('output plugin: stdout', function(){
  it('should be simple output successful.', function(done){
    var args = {
    };

    stdout.output(args, "test", function(err, output){
      err.should.be.false;
      output.should.be.equal("test");
      done();
    });
  });

  it('should be simple output successful.', function(done){
    var args = {
      "format": "PLUGIN TEST: __word__"
    };

    stdout.output(args, "test", function(err, output){
      err.should.be.false;
      output.should.be.equal("PLUGIN TEST: test");
      done();
    });
  });
});
