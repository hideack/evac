var twitter = require('../../../lib/plugin/in/twitter.js'),
    fs = require('fs'),
    path = require('path');

describe('input plugin: twitter', function(){
  var args = {
    'format': 'tweet:__tweet__ ',
    'consumerKey': 'test',
    'consumerSecret': 'test',
    'accessTokenKey': 'test',
    'accessTokenSecret': 'test'
  };

  beforeEach(function(done) {
    var cacheDir = process.env.HOME + "/.evac/twitter/6112dad1240fe753cdd5d4084991dce8";
    var cacheFile = cacheDir + '/last_tweet_index.dat';

    fs.exists(cacheFile, function(exists) {
      if (exists) {
        fs.unlinkSync(cacheFile);
      }
      done();
    });
  });

  it.skip('should be get twitter timeline.', function(done){
    twitter.load(args, function(err, output){
      output.length.should.be.equal(199);
      err.should.be.false;
      done();
    });
  });

  it.skip('should be tweet formated.', function(done){
    twitter.load(args, function(err, output){
      err.should.be.false;
      output[1].should.be.equal("tweet:今日もいい天気。 ");
      done();
    });
  });
});
