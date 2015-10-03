var GaerOrigin = require('gaer');
var gaer = {};

gaer.output = function(args, word, next) {
  var gaerCore = new GaerOrigin(args.id);
  var report = {};

  report[args.parameterName] = word;
  gaerCore.record(args.reportName, JSON.stringify(report));
}

module.exports = gaer;
