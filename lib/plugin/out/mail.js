var nodemailer = require('nodemailer');
var mail = {};

mail.output = function(args, word, next) {
  if (word != "") {
    var transporter = nodemailer.createTransport();
    var options = {
      from: args.from,
      to: args.to,
      subject: args.subject,
      text: word
    };

    transporter.sendMail(options, function(error, info) {
      if(error) {
        next(true, "send mail error.");
      } else {
        next(false, info.response);
      }
    });
  }
}

module.exports = mail;

