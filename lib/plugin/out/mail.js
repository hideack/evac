var nodemailer = require('nodemailer');
var mail = {};

mail.output = function(args, word) {
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
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }
}

module.exports = mail;

