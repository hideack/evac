
### httppost

#### Parameters

| Name   | parameter |
|--------|----------------------------|
| url    | Post URL is specified.     |
| body   | Body                       |

#### Example

It describes as follows to transmit by application/x-www-form-urlencoded.

    "httpPost": {
      "url": "http://requestb.in/12345",
      "body": {
        "form": {"auth_token": "secret_foo", "value": "__word__"}
      }
    }

It describes as follows to transmit by application/json.

    "httpPost": {
      "url": "http://requestb.in/12345",
      "body": {
        "json": {"auth_token": "secret_foo", "value": "__word__"}
      }
    }


