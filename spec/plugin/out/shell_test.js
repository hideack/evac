var shell = require('../../../lib/plugin/out/shell.js'),
    nock = require('nock');

describe('output plugin: shell', function(){
  it('should be echo command successful.', function(){
    var args = {
      "command": "echo %s"
    };

    shell.output(args, "test");
  });
});
