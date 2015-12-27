var gaAnalytics = require("ga-analytics"),
    moment = require("moment"),
    format = require('string-format');

var googleAnalytics = {};

googleAnalytics.load = function(args, next) {
  var outputs = [];

  // Setting before a fixed period of time
  if (args.timeago) {
    args['startDate'] = args['endDate'] = moment().add(-1 * args.timeago.ago, args.timeago.period).format("YYYY-MM-DD");
  }

  gaAnalytics(args, function(err, res) { 
    if(err) {
      next(error, "google analytics error.");
      return;
    }

    if (args.results == "rows") {
      outputs = res.rows.map(function(val) {
        var passed = [args.format].concat(val);
        return format.apply({}, passed);
      });

      if (args.limit) {
        outputs = outputs.slice(0, args.limit);
      }

    } else {
      outputs.push(res.totalsForAllResults[args.metrics]);
    }

    next(false, outputs);
  });
};

module.exports = googleAnalytics;
