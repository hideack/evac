var condition = {};

condition.filter = function(args, word, next) {
  var passedWord = null;
  var condition = word + args.rule;

  try {
    if (eval(condition)) {
      if (args.format) {
        passedWord = args.format.replace("__word__", word);
      } else {
        passedWord = word;
      }
    }
    next(false, passedWord);
  } catch(e) {
    next(true, null);
  }
}

module.exports = condition;
