'use strict';
var core = {};
var config = require('nconf');

core.start = function(program, args) {
  config.use('file', {file: args[0]});

  config.load(function (err, conf) {
    var inputPlugin, filterPlugin, outputPlugin,
        inputArgs, filterArgs, outputArgs;

    for (var plugin in conf.out) {
      var pluginFileName = __dirname + '/plugin/out/' + plugin.toLowerCase() + '.js';
      outputPlugin = require(pluginFileName);
      outputArgs = conf.out[plugin];
    }

    for (var plugin in conf.filter) {
      var pluginFileName = __dirname + '/plugin/filter/' + plugin.toLowerCase() + '.js';
      filterPlugin = require(pluginFileName);
      filterArgs = conf.filter[plugin];
    }

    for (var plugin in conf.in) {
      var pluginFileName = __dirname + '/plugin/in/' + plugin.toLowerCase() + '.js';
      inputPlugin = require(pluginFileName);
      inputArgs = conf.in[plugin];
    }

    inputPlugin.load(inputArgs, function(err, outputs){
      if (err) {
        console.log("Input module - raise error.");
        console.log(err);
        process.exit(1);
      }

      for (var i=0; i<outputs.length; i++) {
        filterPlugin.filter(filterArgs, outputs[i], function(err, output){
          if (err) {
            console.log("Filter module - raise error.");
            console.log(err);
            process.exit(1);
          }

          outputPlugin.output(outputArgs, output);
        });
      }
    });
  });
}

module.exports = core;
