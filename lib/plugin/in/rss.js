var parser = require('feedparser'),
    request = require('request'),
    fs = require('fs'),
    mkdir = require('mkdirp'),
    moment = require('moment'),
    crypto = require('crypto');

var rss = {};

var md5 = function(word) {
  return crypto.createHash('md5').update(word).digest("hex");
}

rss.load = function(args, next) {
  var articles = [];
  var cacheDir = process.env.HOME + "/.evac/rss/" + md5(args.url);


  fs.readFile(cacheDir + "/publish-date", "utf8", function(err, data) {
    var lastUpdate;

    if (err) {
      lastUpdate = 0;
    } else {
      lastUpdate = moment(new Date(data));
    }

    mkdir(cacheDir, function(err) {
      var responseArticles = [];
      var lastDate = "";

      request(args.url)
        .pipe(new parser())
        .on('error', function(error) {
          next(error, "request error.");
        })
        .on('readable', function () {
          var stream = this, item;

          while (item = stream.read()) {
            //({description: articleBody, link: item.link, date: item.date};
            articleBody = item.description.replace(/(<([^>]+)>)/ig,"").replace(/[\n\r]/g,"");

            if (moment(new Date(item.date)).diff(lastUpdate) <= 0) {
              continue;
            }

            if (args.format) {
              var formatDescription = args.format;
              formatDescription = formatDescription.replace("__description__", articleBody);
              formatDescription = formatDescription.replace("__link__", item.link);
            } else {
              formatDescription = articleBody;
            }

            articles.push(formatDescription);

            if (lastDate == "") {
              lastDate = item.date;
            }
          }
        })
        .on('finish', function(){
          if (articles.length > 0) {
            fs.writeFileSync(cacheDir + "/publish-date", lastDate);
          }

          next(false, articles);
        });
    });
  });
}

module.exports = rss;
