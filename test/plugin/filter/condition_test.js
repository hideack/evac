var condition = require('../../../lib/plugin/filter/condition.js');

describe('filter plugin: condition', function(){
  it('should throuw input value if match condition.', function(done){
    condition.filter({'rule': '<5'}, "1", function(err, word){
      word.should.equal("1");
      done();
    });
  });

  it('should output static message if match condition.', function(done){
    condition.filter({'rule': '<5', 'format': 'hey'}, "1", function(err, word){
      word.should.equal("hey");
      done();
    });
  });

  it('should output format message if match condition.', function(done){
    condition.filter({'rule': '<5', 'format': 'OUTPUT:__word__'}, "1", function(err, word){
      word.should.equal("OUTPUT:1");
      done();
    });
  });

  it('should output is null if not match condition.', function(done){
    condition.filter({'rule': '>5', 'format': 'hey'}, "1", function(err, word){
      var should = require('chai').should();
      should.equal(word, null);
      done();
    });
  });

  it('rase error if passed invalid rule.', function(done){
    condition.filter({'rule': 'hoge'}, "1", function(err, word){
      err.should.be.true;
      done();
    });
  });
});
