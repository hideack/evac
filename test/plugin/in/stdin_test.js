var stdin = require('../../../lib/plugin/in/stdin.js');
describe('input plugin: stdin', function(){
  it.skip('should received STDIN.', function(done){
    stdin.load({}, function(error, output){
      done();
    });
  });
});
