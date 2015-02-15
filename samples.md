---
layout: default
title: Sample
---

# Sample

## STDIN -> Pushbullet

Notify of the STDIN contents using by Pushbullet.

    in:
      stdin:
    out:
      pushbullet:
        device: ******@gmail.com
        token: *******
        title: テスト
        mode: note


![STDIN -> Pushbullet](http://cdn-ak.f.st-hatena.com/images/fotolife/h/hideack/20150214/20150214175227.gif)

## ics -> notice

Announces your schedule of less than 1 hour by Growl. 

    {
      "in": {
        "ical": {
          "url": "http://****.********.jp/calendar/ical/*****.ics",
          "within": 1
        }
      },
      "filter": {
        "through": {}
      },
      "out": {
        "notice": {
          "type": "growl",
          "title": "予定の通知"
        }
      }
    }

![ics to notice sample.](http://f.st-hatena.com/images/fotolife/h/hideack/20141114/20141114092941.gif?1415924992)


