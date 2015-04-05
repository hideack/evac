var parser = require('../../../lib/plugin/in/webpageparse.js'),
    here = require('here').here,
    nock = require('nock');

describe('input plugin: webpageparse', function(){
  var mockSite1 = "http://test1.hideack";
  var mockSite2 = "http://test2.hideack";

  beforeEach(function() {
    var testBody = here(/*
    <html>
     <head>
      <title>PHP Test</title>
     </head>
     <body>
       <p id="evac">foobar</p>
     </body>
    </html>
    */
    ).unindent();

    nock(mockSite1).get('/').reply(200, testBody);
    nock(mockSite2).get('/').reply(200, testBody);
  });

  it('should be get to HTTP contents.', function(done){
    parser.load({url:"http://test1.hideack/", target:"#evac"}, function(error, outputs){
      error.should.be.false;
      done();
    });
  });

  it('should be get to any HTTP contents.', function(done){
    parser.load({url:["http://test1.hideack/", "http://test2.hideack/"], target:"#evac"}, function(error, outputs){
      error.should.be.false;
      outputs.should.deep.equal(["foobar", "foobar"]);
      done();
    });
  });

});

