var textfile = require('../../../lib/plugin/in/textfile.js');
describe('input plugin: textfile', function(){
  it('should readable text file by line.', function(done){
    var sampleFile = process.cwd() + '/test/fixtures/sample/test.txt';

    textfile.load({name: sampleFile}, function(error, output){
      error.should.be.false;
      output.should.be.deep.equal(["abc123"]);
      done();
    });
  });
});
