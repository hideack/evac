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
    var responseArticles = [];

    request(args.url)
      .pipe(new parser())
      .on('error', function(error) {
        next(error, "request error.");
      })
      .on('readable', function () {
        var stream = this, item;

        while (item = stream.read()) {
          articleBody = item.description.replace(/(<([^>]+)>)/ig,"").replace(/[\n\r]/g,"");
          articles.push({description: articleBody, link: item.link});
        }

        for (var i=0; i<articles.length; i++) {
          var title = articles[i].title;
          var description = articles[i].description;
          var link = articles[i].link;

          if (args.uniqueness) {
            var regexp = new RegExp(args.uniqueness);

            if (description.match(regexp) == null) {
              articleHash = md5(description);
            } else {
              articleHash = md5(description.match(regexp)[0]);
            }
          } else {
            articleHash = md5(description);
          }

          if((!fs.existsSync(cacheDir + "/" + articleHash)) || args.forceParse) {
            fs.writeFileSync(cacheDir + "/" + articleHash, "1");

            if (args.format) {
              var formatDescription = args.format;
              formatDescription = formatDescription.replace("__description__", description);
              formatDescription = formatDescription.replace("__link__", link);

              responseArticles.push(formatDescription);
            } else {
              responseArticles.push(description);
            }
          }
        }
      })
      .on('finish', function(){
        next(false, responseArticles);
      });
  });

}

module.exports = rss;
