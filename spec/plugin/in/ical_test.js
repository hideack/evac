var ical = require('../../../lib/plugin/in/ical.js'),
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
      DTSTART:__testdate__T235500Z
      DTSTAMP:__testdate__T235500Z
      CREATED:__testdate__T235500Z
      LAST-MODIFIED:__testdate__T235500Z
      DTEND:__testdate__T100000Z
      SUMMARY:meeting
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

    var icalData = testData.replace(/__testdate__/g, "20141013");
    nock("http://test.com").get('/ics').reply(200, icalData);
  });

  it('should be able to read from iCal format file.', function(done){
    ical.load({url:"http://test.com/ics", within:24}, function(error, outputs){
      outputs[0].should.be.equal('meeting - Tue Oct 14 2014 08:55:00 GMT+0900 (JST)');
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
