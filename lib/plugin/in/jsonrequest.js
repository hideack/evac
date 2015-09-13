var request = require('request');
var jsonRequest = {};

jsonRequest.load = function(args, next) {
  args['json'] = true;

  request.get(args, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseProperty = eval("body." + args.targetProperty);
      next(false, [parseProperty]);
    } else {
      next(error, "HTTP request failed.");
    }
  })
}

module.exports = jsonRequest;
