var sleep = {};

sleep.filter = function(args, word, next) {
  setTimeout(function() {
    next(false, word);
  }, args.sec * 1000);
}

module.exports = sleep;
