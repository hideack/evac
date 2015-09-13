var jsonRequest = require('../../../lib/plugin/in/jsonrequest.js'),
    nock = require('nock'),
    here = require('here').here;

describe('input plugin: json request', function(){
  var mockApiUrl = "http://test.com/json";

  beforeEach(function(done) {
    var testJsonApiResponse = here(/*
    {
        "data": {
            "bio": "Sample",
            "counts": {
                "followed_by": 777,
                "follows": 222,
                "media": 500 
            },
            "full_name": "evac",
            "id": "1",
            "profile_picture": "http://hideack.github.io/evac",
            "username": "evac",
            "website": "http://hideack.github.io/evac"
        },
        "meta": {
            "code": 200
        }
    }
    */
    ).unindent();

    nock("http://test.com").get('/json').reply(200, testJsonApiResponse, {"Content-Type": "application/json; charset=utf-8"});
    done();
  });

  it('should be parse JSON API', function(done){
    jsonRequest.load({url: mockApiUrl, targetProperty:"data.counts.followed_by"}, function(err, responses) {
      err.should.be.false;
      responses[0].should.be.equal(777);
      done();
    });
  });
});
