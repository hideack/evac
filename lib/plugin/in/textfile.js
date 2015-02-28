var fs = require('fs'),
    byline = require('byline');

var textfile = {};

textfile.load = function(args, next) {
  var stream = byline(fs.createReadStream(args.name, { encoding: 'utf8' }));

  stream.on('data', function(line) {
    next(false, [line]);
  });
}

module.exports = textfile;
