var request = require('request');
var line = {};

line.output = function(args, word, next) {
  // format
  if (args.format) {
    noticeMessage = args.format.replace("__word__", word);
  } else {
    noticeMessage = word;
  }

  // line notify parameters
  var settings = {
    url: 'https://notify-api.line.me/api/notify',
    headers: {Authorization: 'Bearer ' + args.token},
    form:{message: noticeMessage}
  };

  request.post(settings, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      next(false, noticeMessage);
    } else {
      next(true, "notify-api.line.me API call failed.");
    }
  });
}

module.exports = line;
