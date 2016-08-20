var gaer = require('../../../lib/plugin/out/gaer.js'),
    path = require('path');

describe('output plugin: gaer', function(){
  it('should be post data for GA.', function(done){
    var sepia = require('sepia');
    sepia.fixtureDir(path.join(process.cwd(), 'test', 'sepia-fixtures'));

    var args = {
      id: "UA-37457105-4",
      reportName: "TEST",
      parameterName: "PARAMETER"
    };

    gaer.output(args, "123", function(err, output){
      err.should.be.false;
      done();
    });
  });
});
