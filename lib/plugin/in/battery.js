var batteryLevel = require('battery-level');

var battery = {};

battery.load = function(args, next) {
  batteryLevel(function (err, res) {
    if (err) {
      next(true, null);
      return;
    }

    next(false, [res]);
  });
}

module.exports = battery;
