var mockMailer = require('mock-nodemailer');
var mail = require('../../../lib/plugin/out/mail.js');

describe('output plugin: mail', function(){
  it('should be email gets sent', function(done){
    var args = {
      from: 'hideack99@gmail.com',
      to: 'hideack99@gmail.com',
      subject: 'テストメール'
    };

    var word = "test";

    mockMailer.expectEmail(args, done);

    mail.output(args, word, function(err, info){
      done();
    });
  });
});
