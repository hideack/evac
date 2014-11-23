var pushBullet = {};
var PushBullet = require('pushbullet');

pushBullet.output = function(args, word, next) {
  if (word != "") {
    var pushWord, pushMode;
    var pusher = new PushBullet(args.token);

    // format
    if (args.format) {
      pushWord = args.format.replace("__word__", word);
    } else {
      pushWord = word;
    }

    // push type (note or link)
    if (args.mode) {
      pushMode = args.mode;
    } else {
      pushMode = "note";
    }

    // push
    try {
      pusher[pushMode](args.device, args.title, pushWord, function(error, response) {
        if (error) {
          next(true, "Push failed via PushBullet.");
          return;
        }

        next(false, pushWord);
      });
    } catch(e) {
      next(e, "PushBullet raise error.");
    }
  }
}

module.exports = pushBullet;
