var request = require('request');
var yo = {};

yo.output = function(args, word, next) {
  var yoAllApi = "http://api.justyo.co/yoall/";

  if (word != "") {
    var params = {
      method: "POST",
      uri: yoAllApi,
      form: {api_token: args.token}
    };

    request(params, function(err, response, body){
      if (err) {
        next(err, "");
        return;
      }

      if (response.statusCode == 400) {
        next(true, "Status code=" + response.statusCode);
        return;
      }

      next(false, null);
      return;
    });

  }
}

module.exports = yo;
