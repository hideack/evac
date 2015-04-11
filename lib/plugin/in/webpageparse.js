var step = require('step'),
    client = require('cheerio-httpcli');

var webPageParser = {};

webPageParser.load = function(args, next) {
  var targetPages = Array.isArray(args.url) ? args.url : [args.url];
  var targetDom = args.target;
  var interval = (args.interval) ? args.interval : 100;
  var fetchTexts = [];

  var fetchPage = function() {
    var url = targetPages.shift();

    client.fetch(url, function (err, $, res) {
      if (err) {
        fetchTexts.push("");
      } else {
        fetchTexts.push($(targetDom).text());
      }

      if (targetPages.length == 0) {
        next(false, fetchTexts);
      } else {
        step(
          function wait(){
            setTimeout(this, interval);
          },
          function nextCall() {
            fetchPage();
          }
        );
      }
    });
  };

  fetchPage();
}
module.exports = webPageParser;
