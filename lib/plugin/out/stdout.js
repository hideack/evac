var stdout = {};

stdout.output = function(args, word) {
  if (word != "") {
    console.log(word);
  }
}

module.exports = stdout;
