var mockMailer = require('mock-nodemailer');
var mail = require('../../../lib/plugin/out/mail.js');

describe('output plugin: mail', function(){
  it.skip('should be email gets sent', function(done){
    var args = {
      from: 'tester99@gmail.com',
      to: 'tester99@gmail.com',
      subject: 'テストメール'
    };

    var word = "test";

    mockMailer.expectEmail(args, done);

    mail.output(args, word, function(err, info){
      err.should.be.false;
      done();
    });
  });
});
