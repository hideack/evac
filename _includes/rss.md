
### rss

Subscription in RSS.

#### Parameters

| Name       | parameter |
|------------|----------------------------|
| url        | Feed URL. |
| uniqueness | Uniqueness |
| format     | Passed subscription format. |

#### Example

    "rss": {
      "url": "http://feeds.feedburner.com/hideack?format=xml",
      "format": "__description__\n__link__",
      "uniqueness": "Update：.*"
    }

