var shell = require('../../../lib/plugin/out/shell.js'),
    nock = require('nock');

describe('output plugin: shell', function(){
  it('should be echo command successful.', function(done){
    var args = {
      "command": "echo __word__"
    };

    shell.output(args, "test", function(err, output){
      err.should.be.false;
      output.should.be.equal("test\n");
      done();
    });
  });

  it('should be command fails.', function(done){
    var args = {
      "command": "hogehoge __word__"
    };

    shell.output(args, "test", function(err, output){
      err.should.be.true;
      done();
    });
  });
});
