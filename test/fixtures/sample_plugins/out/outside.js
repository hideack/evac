var outside = {};

outside.output = function(args, word, next) {
  if (word != "") {
    var stdoutWord;

    if (args.format) {
      stdoutWord = args.format.replace("__word__", word);
    } else {
      stdoutWord = word;
    }

    console.log(word + " (this is outside plugin)");
    next(false, stdoutWord);
  }
}

module.exports = outside;
