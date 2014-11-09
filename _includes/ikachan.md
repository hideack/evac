
### ikachan

This plugin allows you to notify feed updates to IRC channels.

#### Parameters

| Name   | parameter |
|--------|----------------------------|
| url     | Ikachan URL. |
| channel | The channel which participates is specified. |
| message | The message notified by IRC. __word__ is replaced by passed words. |

#### Example

    "ikachan": {
      "url": "http://....",
      "channel": "#evac",
      "message": "Output is __word__ "
    }

