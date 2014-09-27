var parser = require('feedparser'),
    request = require('request'),
    fs = require('fs'),
    mkdir = require('mkdirp'),
    crypto = require('crypto');

var rss = {};

var md5 = function(word) {
  return crypto.createHash('md5').update(word).digest("hex");
}

rss.load = function(args, next) {
  var articles = [];
  var cacheDir = process.env.HOME + "/.evac/rss/" + md5(args.url);

  mkdir(cacheDir, function(err) {
    request(args.url)
      .pipe(new parser())
      .on('error', function(error) {
      })
      .on('readable', function () {
        var stream = this, item;

        while (item = stream.read()) {
          articleBody = item.description.replace(/(<([^>]+)>)/ig,"").replace(/[\n\r]/g,"");
          articleHash = md5(articleBody);

          if(!fs.existsSync(cacheDir + "/" + articleHash)) {
            fs.writeFileSync(cacheDir + "/" + articleHash, "1");
            articles.push(articleBody);
          }
        }

        next(false, articles);
      });
  });

}

module.exports = rss;
