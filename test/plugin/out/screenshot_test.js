var screenshot = require('../../../lib/plugin/out/screenshot.js');
var fs = require('fs');

describe('output plugin: screenshot', function(){
  this.timeout(10000);

  var url = "http://www.yahoo.co.jp";
  var args = {
    "path": process.cwd() + "/test/tmp"
  };

  beforeEach(function(done) {
    var screenshotImage = args.path + "/www.yahoo.co.jp.png";

    fs.exists(screenshotImage, function(exists) {
      if (exists) {
        fs.unlinkSync(screenshotImage);
      }
      done();
    });
  });

  it('should be take a screenshot.', function(done){
    screenshot.output(args, url, function(err, output) {
      err.should.be.false;
      done();
    });
  });
});
