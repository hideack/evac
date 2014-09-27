var diff = {};
var jsdiff = require('diff'),
    fs = require('fs'),
    mkdir = require('mkdirp');

diff.filter = function(args, word, next) {
  var bufferDir = process.env.HOME + "/.evac/diff";
  var bufferFile = bufferDir + '/' + args.bufferName;

  fs.readFile(bufferFile, "utf8", function(err, bufferedWord){
    var addedWord = "";

    if (typeof bufferedWord !== "undefined") {
      var diffWords = jsdiff.diffChars(bufferedWord, word);

      diffWords.forEach(function(part){
        if (part.added) {
          addedWord = addedWord + part.value;
        }
      });
    }

    mkdir(bufferDir, function(err) {
      if(err) throw err;

      fs.writeFileSync(bufferFile, word);

      next(false, addedWord);
    });

  });
}

module.exports = diff;
