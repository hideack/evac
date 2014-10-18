var notice = require('../../../lib/plugin/out/notice.js'),
    nock = require('nock');

describe('output plugin: notice', function(){
  it.skip('should be notice successful.', function(){
    var args = {
      "settings": {
        "title": "test-notice"
      }
    };

    notice.output(args, "test");
  });
});
