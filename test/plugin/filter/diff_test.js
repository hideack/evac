var diff = require('../../../lib/plugin/filter/diff.js');
var fs = require('fs');

describe('filter plugin: diff', function(){
  beforeEach(function(done){
    var bufferDir = process.env.HOME + "/.evac/diff";
    var bufferFile = bufferDir + '/test';

    fs.exists(bufferFile, function(exists) {
      if (exists) {
        fs.unlinkSync(bufferFile);
      }
      done();
    });
  });

  it('should be no output for first time', function(done){
    diff.filter({bufferName: 'test'}, "abcdef", function(err, word){
      err.should.be.false;
      word.should.be.equal("");
      done();
    });
  });

  it('should be output diff words', function(done){
    diff.filter({bufferName: 'test'}, "本日は晴天", function(err, word){
      diff.filter({bufferName: 'test'}, "本日は晴天なり", function(err, word){
        err.should.be.false;
        word.should.be.equal("なり");
        done();
      });
    });
  });

});
