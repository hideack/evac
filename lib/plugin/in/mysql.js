var tunnel = require('tunnel-ssh');
var db = require('mysql');

var mysql = {};

mysql.connect = function(settings, query, target, next) {
  var connection = db.createConnection(settings);
  connection.query(query, function(err, result) {
    var results = [];
    results.push(result[0][target]);

    connection.end(function() {
      next(false, results);
    });
  });
}

mysql.load = function(args, next) {
  if (args.sshForward) {
    var privateKeyPath = args.sshForward.privateKey;

    args.sshForward.privateKey = require('fs').readFileSync(privateKeyPath);

    var server = tunnel(args.sshForward, function (error, result) {
      if (error) {
        next(true, error);
      } else {
        mysql.connect(args.settings, args.query, args.target, next);
      }
    });
  } else {
    mysql.connect(args.settings, args.query, args.target, next);
  }
}


module.exports = mysql;
