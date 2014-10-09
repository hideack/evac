var request = require('request');
var httpPost = {};

httpPost.output = function(args, word) {
  var jsonFlag = false;

  request.post(
    args.url,
    args.body,
    function (err, res, body) {
      if (!err) {
      } else {
        console.log("Error: post fail");
        console.log(err);
      }
    }
  );
}

module.exports = httpPost;
