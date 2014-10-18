var notifier = require('node-notifier');
var notice = {};

notice.output = function(args, word) {
  if (word != "") {
    settings = args.settings;
    settings.message = word;

    notifier.notify(settings, function(err, response) {
    });
  }
}

module.exports = notice;
