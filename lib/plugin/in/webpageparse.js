var client = require('cheerio-httpcli');
var webPageParser = {};

webPageParser.load = function(args, next) {
  client.fetch(args.url, function (err, $, res) {
    var fetchText = $(args.target).text();
    next(false, fetchText);
  });
}
module.exports = webPageParser;
