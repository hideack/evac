var notifier = require('node-notifier');
var notice = {};

notice.output = function(args, word, next) {
  if (word != "") {
    settings = args.settings;
    settings.message = word;

    notifier.notify(settings, function(err, response) {
      if (err) {
        next(true, "Notice failed...");
      } else {
        next(false, null);
      }
    });
  }
}

module.exports = notice;
