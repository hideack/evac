var notice = require('../../../lib/plugin/out/notice.js'),
    nock = require('nock');

describe('output plugin: notice', function(){
  it('should be notice successful.', function(){
    var args = {
      "settings": {
        "title": "test-notice"
      }
    };

    notice.output(args, "test", function(err, output){
      err.should.be.false;
    });
  });
});
