var request = require('request');
var slack = {};

slack.output = function(args, word, next) {
  var options = {
    uri: args.url,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: word })
  };

  request.post(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      next(false, body);
    } else {
      next(true, "Slack incomming API call failed.");
    }
  });
}

module.exports = slack;
