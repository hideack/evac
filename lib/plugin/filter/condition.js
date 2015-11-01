var condition = {};

condition.filter = function(args, word, next) {
  next(false, word);
}

module.exports = condition;
