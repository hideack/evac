var request = require('request');
var slack = {};

slack.output = function(args, word, next) {
  // format
  var slackPushWord;

  if (args.format) {
    slackPushWord = args.format.replace("__word__", word);
  } else {
    slackPushWord = word;
  }

  // slack incoming Webhook settings.
  var slackSetting = {
    text: slackPushWord
  };

  // call API
  var options = {
    uri: args.url,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slackSetting)
  };

  request.post(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      next(false, slackPushWord);
    } else {
      next(true, "Slack incomming API call failed.");
    }
  });
}

module.exports = slack;
