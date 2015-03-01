var screenshot = {};
var webshot = require('webshot'),
    url = require('url');

screenshot.output = function(args, word, next) {
  var targetUrl = word;

  if (url.parse(targetUrl).hostname === null) {
    targetUrl = "http://" + targetUrl;
  }

  var fileName = url.parse(targetUrl).hostname + ".png";
  var filePath = args.path + "/" + fileName;

  var options = {
    timeout: 10000
  }

  webshot(targetUrl, filePath, options, function(err){
    if (err) {
      next(false, "HTTP Error:" + targetUrl + " Message:" + err);
    } else {
      next(false, "Save screen shot: " + filePath);
    }
  });
}

module.exports = screenshot;
