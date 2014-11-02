var notifier = require('node-notifier');
var notice = {};

notice.output = function(args, word, next) {
  if (word != "") {
    var evacNotice;

    if (args.type == "growl") {
      evacNotice = notifier.Growl({name:'evac'});
    } else {
      evacNotice = notifier;
    }

    var settings = {
      "message": word,
      "title": args.title
    };

    evacNotice.notify(settings, function(err, response) {
      if (err) {
        next(true, "Notice failed...");
      } else {
        next(false, null);
      }
    });
  }
}

module.exports = notice;
