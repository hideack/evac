var request = require('request');
var client = {};

client.load = function(args, next) {
  request.get(args, function (error, response, body) {
    console.log(response);

    if (!error && response.statusCode == 200) {
      parseProperty = eval("body." + args.targetProperty);
      next(false, [parseProperty]);
    } else {
      next(error, "HTTP request failed.");
    }
  })
}

module.exports = client;
