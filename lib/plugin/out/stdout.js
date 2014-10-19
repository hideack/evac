var stdout = {};

stdout.output = function(args, word, next) {
  if (word != "") {
    console.log(word);
    next(false, word);
  }
}

module.exports = stdout;
