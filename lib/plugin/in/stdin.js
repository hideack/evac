var stdin = {};

stdin.load = function(args, next) {
  var stdinWord = require("fs").readFileSync("/dev/stdin", "utf8");
  next(false, [stdinWord]);
}

module.exports = stdin;
