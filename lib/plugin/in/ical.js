var ical = {};
var parser = require('ical');
var moment = require('moment');

ical.load = function(args, next) {
  parser.fromURL(args.url, {}, function(err, data) {
    var planStartDate, checkRange, outputFormat;
    var outputs = [];

    checkRange = args.within * 3600 * 1000;

    for(var plan in data) {
      if (typeof data[plan].start == "undefined") continue;

      planStartDate = moment(data[plan].start);

      if (args.offset) {
        planStartDate.add(args.offset, "hours");
      }

      dateDiff = planStartDate.diff(Date.now());

      if (dateDiff < 0) continue;
      if (dateDiff > checkRange) break;

      outputs.push(data[plan].summary + " - " + data[plan].start.toLocaleString());
    }

    next(false, outputs);
  });
}
module.exports = ical;
