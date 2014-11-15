var itc = require("itunesconnect");
var Report = itc.Report;

var iTunesConnect = {};

iTunesConnect.load = function(args, next) {
  var passedUnit = [];
  var itunes = new itc.Connect(args.email, args.password);

  itunes.request(Report.ranked().time(args.within, 'days'), function(error, result) {
    if (error) {
      next(error, "iTunes connect error.");
    }

    var i, application, unit;

    if (typeof result.length === "undefined") {
      next(result, "iTunes connect error.");
    }

    for (i=0; i<result.length; i++) {
      application = result[i];

      if (application.title == args.title) {
        passedUnit.push(application.units);
      }
    }
  });

  next(false, passedUnit);
}

module.exports = iTunesConnect;
