var request = require('request');
var httpPost = {};

httpPost.output = function(args, word) {
  var jsonFlag = false;
  var postBody = {};

  if (args.body.json) {
    postBody = {json: {}};

    for (var i in args.body.json) {
      postBody.json[i] = args.body.json[i].replace("%s", word);
    }
  }

  if (args.body.form) {
    postBody = {form: {}};

    for (var i in args.body.form) {
      postBody.form[i] = args.body.form[i].replace("%s", word);
    }
  }

  request.post(
    args.url,
    postBody,
    function (err, res, body) {
      if (!err) {
        return postBody;

      } else {
        console.log("Error: post fail");
        console.log(err);
      }
    }
  );
}

module.exports = httpPost;
