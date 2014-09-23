var match = {};

match.filter = function(args, word, next) {
  var regexp = new RegExp(args.regexp);

  if(word.match(regexp) == null) {
    next(true, '');
    return;
  }

  var filteredWord = word.match(regexp)[0];
  next(false, filteredWord);
}

module.exports = match;
