var condition = require('../../../lib/plugin/filter/condition.js');

describe('filter plugin: condition', function(){
  describe('Passed simple condition', function(){
    it('should throuw input numeric value if match condition.', function(done){
      condition.filter({'rule': '<5'}, "1", function(err, word){
        word.should.equal("1");
        done();
      });
    });

    it('should throuw input string value if match condition.', function(done){
      condition.filter({'rule': '.length < 5'}, "abc", function(err, word){
        word.should.equal("abc");
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

  describe('Passed same conditions', function(){
    it('should output static message if match last condition.', function(done){
      condition.filter([{'rule': '>=5', 'format': 'foo'}, {'rule': '<5', 'format': 'bar'}], "1", function(err, word){
        word.should.equal("bar");
        done();
      });
    });

    it('should output static message if match first condition.', function(done){
      condition.filter([{'rule': '>=5', 'format': 'foo'}, {'rule': '<5', 'format': 'bar'}], "10", function(err, word){
        word.should.equal("foo");
        done();
      });
    });
  });

});
