var staticWord = {};

staticWord.load = function(args, next) {
  next(false, [args.text]);
}
module.exports = staticWord;
