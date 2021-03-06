var path = require('path'),
    searchrank = require('../../../lib/plugin/in/searchrank.js');

describe('input plugin: searchrank', function(){
  it('should be get search rank.', function(done){
    var sepia = require('../../util/sepia');
    sepia.fixtureDir(path.join(process.cwd(), 'test', 'sepia-fixtures'));

    var args = {
      "key": "AIzaSyAiGaxucgsfv6oSQSf37vZEEtJyYW_N6dg",   // now disable.
      "cx": "017750037986278266736:tbinzf9dwoi",
      "site": "pickup.calamel.jp",
      "maxPage": 3,
      "format": "__word__ =  __rank__",
      "word": ["よしざわ窯"]
    };

    sepia.enable();
    searchrank.load(args, function(err, outputs){
      err.should.be.false;
      outputs[0].should.be.equal("よしざわ窯 =  3");
      sepia.disable();
      done();
    });
  });

});
