var fs = require('fs'),
    byline = require('byline');

var textfile = {};

textfile.load = function(args, next) {
  var stream = byline(fs.createReadStream(args.name, { encoding: 'utf8' }));
  var lines = [];

  stream.on('data', function(line) {
    lines.push(line);
  });

  stream.on('end', function() {
    next(false, lines);
  });
}

module.exports = textfile;
