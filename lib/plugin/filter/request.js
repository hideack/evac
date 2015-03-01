var client = require('request');
var request = {};

request.filter = function(args, word, next) {
  var options = {
    url: word,
    headers: {
      'User-Agent': 'evac aggregator'
    }
  };

  client(options, function(err, response, body) {
    if (!err) {
      var output = "",
          code = response.statusCode;

      if (args.format) {
        output = args.format.replace("__code__", code).replace("__body__", body);
      } else {
        output = body;
      }

      next(false, output);
    } else {
      next(true, "ERROR:" + err);
    }
  });
}

module.exports = request;
