var NodeTwitter = require('twitter'),
    fs = require('fs'),
    mkdir = require('mkdirp'),
    crypto = require('crypto');
var twitter = {};

var md5 = function(word) {
  return crypto.createHash('md5').update(word).digest("hex");
}

twitter.load = function(args, next) {
  var client = new NodeTwitter({
    consumer_key: args.consumerKey,
    consumer_secret: args.consumerSecret,
    access_token_key: args.accessTokenKey,
    access_token_secret: args.accessTokenSecret
  });

  var cacheDir = process.env.HOME + "/.evac/twitter/" + md5(args.consumerKey);
  var cacheFile = cacheDir + "/last_tweet_index.dat";

  mkdir(cacheDir, function(err) {
    fs.readFile(cacheFile, 'utf8', function(err, sinceId) {
      var twitterSettings = {include_entities:true, count:1000};

      if (!err) {
        twitterSettings['since_id'] = sinceId;
      }

      client.get('/statuses/home_timeline', twitterSettings, function(err, tweets, response) {
        if (!err) {
          var passedTweets = [];

          tweets.forEach(function(tweet, index) {

            if (index == 0) {
              fs.writeFileSync(cacheFile , tweet.id);
            }

            var passedTweet;

            if (args.format) {
              passedTweet = args.format;
              passedTweet = passedTweet.replace(/__tweet__/g, tweet.text.replace("\n", ""));
              passedTweet = passedTweet.replace(/__screen_name__/g, tweet.user.screen_name);
            } else {
              passedTweet = tweet.text;
            }

            passedTweets.push(passedTweet);
          });

          next(false, passedTweets);
        }
      });
    });
  });
}

module.exports = twitter;
