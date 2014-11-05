var request = require('request');
var httpPost = {};

httpPost.output = function(args, word, next) {
  var jsonFlag = false;
  var postBody = {};

  if (args.body.json) {
    postBody = {json: {}};

    for (var i in args.body.json) {
      postBody.json[i] = args.body.json[i].replace("__word__", word);
    }
  }

  if (args.body.form) {
    postBody = {form: {}};

    for (var i in args.body.form) {
      postBody.form[i] = args.body.form[i].replace("__word__", word);
    }
  }

  request.post(
    args.url,
    postBody,
    function (err, res, body) {
      if (err) {
        next(true, "Post failed.");
      } else {
        next(false, body);
      }
    }
  );
}

module.exports = httpPost;
