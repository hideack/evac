var request = require('request');
var ikachan = {};

ikachan.output = function(args, word) {
  var options = {
    form: {
      channel: args.channel
    }
  }

  options.uri = args.url + "/join";

  request.post(options, function(error, response, body){
    if (!error && (response.statusCode == 200 || response.statusCode == 403)) {
      options.uri = args.url + "/notice";
      options.form.message = args.message.replace("%s", word);

      request.post(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
          console.log(options);
        } else {
          console.log('notice error: '+ response.statusCode);
        }
      });
    } else {
      console.log('channel join error: '+ response.statusCode);
    }
  });
}

module.exports = ikachan;
