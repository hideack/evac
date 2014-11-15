var stdout = {};

stdout.output = function(args, word, next) {
  if (word != "") {
    var stdoutWord;

    if (args.format) {
      stdoutWord = args.format.replace("__word__", word);
    } else {
      stdoutWord = word;
    }

    console.log(stdoutWord);
    next(false, stdoutWord);
  }
}

module.exports = stdout;
