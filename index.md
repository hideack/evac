---
layout: default
title: Home
---

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

### -p, --path

In order to use ```-v``` option to set the include path.

----

#### More information

<iframe src="http://ghbtns.com/github-btn.html?user=hideack&repo=evac&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=hideack&repo=evac&type=fork&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=hideack&type=follow&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="165" height="20"></iframe>
