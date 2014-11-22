var rss = require('../../../lib/plugin/in/rss.js'),
    nock = require('nock'),
    fs = require('fs'),
    here = require('here').here;

describe('input plugin: rss', function(){
  var mockRss = "http://test.com/rss";

  beforeEach(function(done) {
    var testFeedWithHtmlTag = here(/*
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
      <link>http://test.com</link>
      <description/>
      <title>sample</title>
      <item>
        <link>http://test.com/40711</link>
        <description>&lt;small&gt;テスト本文(HTMLタグ付き)&lt;/small&gt;</description>
        <title>テストタイトル</title>
        <guid isPermaLink="false">7c7efc1ada6c9342febc5302505e7eb076b4f93f</guid>
      </item>
      </channel>
    </rss>
    */
    ).unindent();

    nock("http://test.com").get('/rss').reply(200, testFeedWithHtmlTag);

    var bufferDir = process.env.HOME + "/.evac/rss/ab25712843b6066950e54871337b229a";
    var bufferFile = bufferDir + '/4f00f0dbefd09f4914dea2765839f3f9';

    fs.exists(bufferFile, function(exists) {
      if (exists) {
        fs.unlinkSync(bufferFile);
      }
      done();
    });

  });

  it('should be able to read from rss2.0', function(done){
    rss.load({url: mockRss}, function(err, bodys) {
      err.should.be.false;
      bodys[0].should.be.equal("テスト本文(HTMLタグ付き)");
      done();
    });
  });

  it('should be format for output strings.', function(done){
    rss.load({url: mockRss, format:"__description__ : __link__"}, function(err, bodys) {
      err.should.be.false;
      bodys[0].should.be.equal("テスト本文(HTMLタグ付き) : http://test.com/40711");
      done();
    });
  });


});
