evac
================

[![Build Status](https://travis-ci.org/hideack/evac.svg?branch=master)](https://travis-ci.org/hideack/evac)
[![npm version](https://badge.fury.io/js/evac.svg)](http://badge.fury.io/js/evac)
[![Circle CI](https://circleci.com/gh/hideack/evac/tree/master.svg?style=svg)](https://circleci.com/gh/hideack/evac/tree/master)

node.js based simple aggregator.

## About
Evac is Node.js based simple aggregator.

![](http://f.st-hatena.com/images/fotolife/h/hideack/20141109/20141109154056.png?1415515265)

## Installation

Install with [npm](https://www.npmjs.org/package/evac):

    $ npm install -g evac

## evac(1)

      Usage: evac [options] <recipe file ...>

      Options:

        -h, --help     output usage information
        -V, --version  output the version number
        -v, --verbose  Verbose mode.
        -c, --cron     Cron mode.
        -p, --path [path]  Plugin path.

### -c, --cron

According to a setup of the file passed by the argument, a job is performed periodically.

Cron patterns suported here extend on the standard Unix format to support seconds digits.


    [
      {"*/10 * * * *": "/home/hideack/recipe/rss.js"},
      {"0 18 * * *": "/home/hideack/recipe/news.js"}
    ]

### -v, --verbose

An execution result is displayed in detail.

## Plugins
### input
- mysql
- rss
- static word
- web page parser
- google analytics
- ical
- iTunes connect
- stdin
- textfile
- battery

### filter
- diff
- match
- through

### output
- http post
- ikachan
- mail
- stdout
- shell
- yo
- pushbullet
- slack
- screenshot

## Sample

### ics -> notice

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

----

[![NPM](https://nodei.co/npm/evac.png)](https://nodei.co/npm/evac/)
