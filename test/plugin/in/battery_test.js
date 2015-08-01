var battery = require('../../../lib/plugin/in/battery.js');

describe('input plugin: battery', function(){
  if (process.platform == 'darwin') {
    it('should received current battery level.', function(done){
      battery.load({}, function(error, output){
        output[0].should.be.a('number');
        done();
      });
    });
  } else {
    it.skip('should received current battery level.', function(done){
      done();
    });
  }
});
