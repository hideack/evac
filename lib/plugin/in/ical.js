var ical = {};
var parser = require('ical');

ical.load = function(args, next) {
  parser.fromURL(args.url, {}, function(err, data) {
    var planStartDate, checkRange, outputFormat;
    var outputs = [];

    checkRange = args.within * 3600 * 1000;

    for(var plan in data) {
      planStartDate = data[plan].start;
      dateDiff = planStartDate - Date.now();

      if (dateDiff < 0) continue;
      if (dateDiff > checkRange) break;

      outputs.push(data[plan].summary + " - " + data[plan].start.toLocaleString());
    }

    next(false, outputs);
  });
}
module.exports = ical;
