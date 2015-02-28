var request = require('request');
var ikachan = {};

ikachan.output = function(args, word, next) {
  var options = {
    form: {
      channel: args.channel
    }
  }

  options.uri = args.url + "/join";

  var needJoin = true;

  if (args.join) {
    needJoin = args.join;
  }

  request.post(options, function(error, response, body){
    if (needJoin && error) {
      next(true, 'channel join error: '+ response.statusCode);
      return;
    }

    options.uri = args.url + "/notice";
    options.form.message = args.message.replace("__word__", word);

    request.post(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        next(false, null);
      } else {
        next(true, 'error: '+ response.statusCode);
      }
    });
  });
}

module.exports = ikachan;
