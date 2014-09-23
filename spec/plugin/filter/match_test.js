var match = require('../../../lib/plugin/filter/match.js');

describe('filter plugin: match', function(){
  it('should match word for regexp parameter', function(done){
    match.filter({regexp: '\\d\\d\\d'}, "abc 123 def", function(err, word){
      word.should.equal("123");
      done();
    });
  });
});
