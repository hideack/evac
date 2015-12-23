var core = require('../lib/core');
var util = require('../lib/util');

describe('evac tasks', function(){
  describe('parseRecipeFile()', function() {
    it('should be parse recipe file. (JSON format)', function(done){
      util.parseSettingFile(__dirname + '/fixtures/recipe/sample.json', function(err, config){
        err.should.be.false;
        config.out.stdout.should.be.a('object');
        done();
      });
    });

    it('should be parse recipe file. (YAML format)', function(done){
      util.parseSettingFile(__dirname + '/fixtures/recipe/sample.yaml', function(err, config){
        err.should.be.false;
        config.out.stdout.should.be.a('object');
        done();
      });
    });

    it('should be parse recipe file. (Multiple recipe / JSON format)', function(done){
      util.parseSettingFile(__dirname + '/fixtures/recipe/multi-sample.json', function(err, config){
        err.should.be.false;
        config.should.be.instanceof(Array);
        config[0].out.stdout.should.be.a('object');
        done();
      });
    });

    it('should be parse recipe file. (Multiple recipe / YAML format)', function(done){
      util.parseSettingFile(__dirname + '/fixtures/recipe/multi-sample.yaml', function(err, config){
        err.should.be.false;
        config.should.be.instanceof(Array);
        config[0].out.stdout.should.be.a('object');
        done();
      });
    });

  });

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

    it('should be parse multiple recipe.', function(done){
      var recipe = [
        {
          "in": {
            "staticWord": {
              "text": "1st recipe."
            }
          },
          "filter": {
            "through": {}
          },
          "out": {
            "stdout": {}
          }
        }
      ];

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

    it('should be add plugin path.', function(done) {
      var recipe = {
        "in": {
          "staticWord": {
            "text": "test word."
          }
        },
        "out": {
          "outside": {}
        }
      };

      core.appendPluginPath("/Users/usr0600170/pj/private/evac/test/fixtures/sample_plugins");

      core.parseRecipeJson(recipe, function(err, message){
        err.should.be.false;
        done();
      });
    });
  });
});
