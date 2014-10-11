var db = require('mysql');
var mysql = {};

mysql.load = function(args, next) {
  var connection = db.createConnection(args.settings);
  connection.query(args.query, function(err, result) {
    var results = [];
    results.push(result[0][args.target]);

    connection.end(function() {
      next(false, results);
    });
  });

}
module.exports = mysql;
