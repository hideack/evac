var gaAnalytics = require("ga-analytics");

var googleAnalytics = {};

googleAnalytics.load = function(args, next) {
  var outputs = [];

  gaAnalytics(args, function(err, res) { 
    if(err) {
      next(error, "google analytics error.");
      return;
    }

    outputs.push(res.totalsForAllResults[args.metrics]);
    next(false, outputs);
  });
};

module.exports = googleAnalytics;
