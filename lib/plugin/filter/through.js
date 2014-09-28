var through = {};

through.filter = function(args, word, next) {
  next(false, word);
}

module.exports = through;
