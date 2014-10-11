var shell = {};
var exec = require('child_process').exec;

shell.output = function(args, word) {
  if (word != "") {
    var command = args.command.replace("%s", word);

    child = exec(command, function(error, stdout, stderr) {
      console.log(stdout);
    });
  }
}

module.exports = shell;
