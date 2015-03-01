var screenshot = {};
var webshot = require('webshot'),
    url = require('url');

screenshot.output = function(args, word, next) {
  var fileName = url.parse(word).hostname + ".png";
  var filePath = args.path + "/" + fileName;

  webshot(word, filePath, function(err){
    if (err) {
      next(true, err);
    } else {
      next(false, "Save screen shot: " + filePath);
    }
  });
}

module.exports = screenshot;
