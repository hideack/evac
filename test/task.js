var core = require('../lib/core');

describe('evac tasks', function(){
  describe('parseRecipeJson()', function(){
    it('should be parse recipe.', function(done){
      var recipe = {
        "in": {
          "staticWord": {
            "text": "test word."
          }
        },
        "filter": {
          "through": {}
        },
        "out": {
          "stdout": {}
        }
      };

      core.parseRecipeJson(recipe, function(err, message){
        err.should.be.false;
        done();
      });
    });

    it('should be parse abbreviated recipe.', function(done){
      var recipe = {
        "in": {
          "staticWord": {
            "text": "test word."
          }
        },
        "out": {
          "stdout": {}
        }
      };

      core.parseRecipeJson(recipe, function(err, message){
        err.should.be.false;
        done();
      });
    });

    it.skip('should be raise error with invalid recipe.', function(done){
      var recipe = {
        "inin": {
          "staticWord": {
            "text": "test word."
          }
        }
      };

      core.parseRecipeJson(recipe, function(err, message){
        err.should.be.not.false;
        done();
      });
    });
  });
});
