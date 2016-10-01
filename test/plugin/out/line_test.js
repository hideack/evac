var line = require('../../../lib/plugin/out/line.js'),
    sepia = require('../../util/sepia'),
    path = require('path');

describe('output plugin: LINE', function(){
  it('should be post data for LINE Notify API.', function(done){
    sepia.fixtureDir(path.join(process.cwd(), 'test', 'sepia-fixtures'));
    sepia.enable();

    var args = {
      token:'KI85dxF52KeN3A0GRNThVQDd09QA8OCLKoSjn1or1RG',
      format: 'REPLACE: __word__'
    };

    line.output(args, "123", function(err, output){
      err.should.be.false;
      sepia.disable();
      done();
    });
  });
});
