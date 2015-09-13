var request = require('request');
var jsonRequest = {};

jsonRequest.load = function(args, next) {
  args['json'] = true;

  request.get(args, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      try {
        parseProperty = eval("body." + args.targetProperty);
      } catch(e) {
        next(e, "JSON parse error.");
        return;
      }

      next(false, [parseProperty]);
    } else {

      if (error) {
        next(error, "HTTP request failed.");
      } else {
        next(true, "HTTP Status Code:" + response.statusCode);
      }
    }
  })
}

module.exports = jsonRequest;
