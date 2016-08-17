var searchrank = {};

searchrank.load = function(args, next) {
  args.word.forEach(function(element, index, array) {
    var passedWord = "";
    var searchrank = require('google-search-rank');

    searchrank.key = args.key;
    searchrank.cx  = args.cx;

    searchrank.find(element, args.site, args.maxPage, function(rank, result){
      passedWord = args.format;
      passedWord = passedWord.replace(/__word__/g, element);
      passedWord = passedWord.replace(/__rank__/g, rank);
      next(false, [passedWord]);

    });
  });
}

module.exports = searchrank;
