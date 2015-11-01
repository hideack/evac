var condition = {};

condition.filter = function(args, word, next) {
  var filterArgs;

  if (Array.isArray(args)) {
    filterArgs = args;
  } else {
    filterArgs = [args];
  }

  var output = false;
  var iteration = 0;

  filterArgs.forEach(function(argument) {
    iteration++;

    var passedWord = null;
    var condition = word + argument.rule;

    console.log("Condition:" + condition);

    try {
      if (eval(condition)) {
        if (argument.format) {
          passedWord = argument.format.replace("__word__", word);
        } else {
          passedWord = word;
        }

        next(false, passedWord);
        output = true;
      }

      if (!output && (iteration == filterArgs.length)) {
        next(false, passedWord);
      }
    } catch(e) {
      next(true, null);
    }
  });

}

module.exports = condition;
