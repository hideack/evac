var ical = require('../../../lib/plugin/in/ical.js'),
    sprintf = require("sprintf-js").sprintf,
    nock = require('nock'),
    here = require('here').here;

describe('input plugin: ical', function(){
  var mockRss = "http://test.com/ics";

  beforeEach(function() {
    var testData = here(/*
      BEGIN:VCALENDAR
      PRODID:-//hideack//evac//EN
      VERSION:2.0
      CALSCALE:GREGORIAN
      METHOD:PUBLISH
      X-WR-CALNAME:evac test sample calendar
      X-WR-TIMEZONE:Asia/Tokyo
      BEGIN:VEVENT
      DTSTART:__testdate__T145500Z
      DTSTAMP:__testdate__T145500Z
      CREATED:__testdate__T145500Z
      LAST-MODIFIED:__testdate__T145500Z
      DTEND:__testdate__T100000Z
      SUMMARY:meeting summary
      ORGANIZER:hideack
      UID:abc@hideack
      DESCRIPTION:meeting
      LOCATION:
      SEQUENCE:1
      STATUS:CONFIRMED
      TRANSP:OPAQUE
      END:VEVENT
      END:VCALENDAR

    */
    ).unindent();

    var date = new Date();
    var formatDate = sprintf("%4d%02d%02d", date.getFullYear(), date.getMonth() + 1, date.getDate() + 1);
    var icalData = testData.replace(/__testdate__/g, "" + formatDate);
    nock("http://test.com").get('/ics').reply(200, icalData);
  });

  it('should be able to read from iCal format file.', function(done){
    ical.load({url:"http://test.com/ics", within:48}, function(error, outputs){
      outputs[0].should.match(/meeting summary -/);
      done();
    });
  });

  it('should be able to read from iCal format file. (with offset)', function(done){
    ical.load({url:"http://test.com/ics", within:49, offset:1}, function(error, outputs){
      outputs[0].should.match(/meeting summary -/);
      done();
    });
  });

  it('should be able not much schedule', function(done){
    ical.load({url:"http://test.com/ics", within:1}, function(error, outputs){
      outputs.length.should.be.equal(0);
      done();
    });
  });
});
