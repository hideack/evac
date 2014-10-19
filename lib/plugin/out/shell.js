var shell = {};
var exec = require('child_process').exec;

shell.output = function(args, word, next) {
  if (word != "") {
    var command = args.command.replace("%s", word);

    child = exec(command, function(error, stdout, stderr) {
      if (error) {
        next(true, stderr);
      } else {
        next(false, stdout);
      }
    });
  }
}

module.exports = shell;
