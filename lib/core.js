'use strict';
var core = {};
var config = require('nconf');
var winston = require('winston');

var getLoggerSettings = function(consoleLog) {
  var settings = {
    transports: [
      new winston.transports.File({ filename: process.env.HOME + "/.evac/evac.log", json: false})
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: process.env.HOME + "/.evac/evac.log", json: false})
    ]
  };

  if (consoleLog) {
    settings.transports.push(new winston.transports.Console({colorize: true, timestamp: true}));
    settings.exceptionHandlers.push(new winston.transports.Console({colorize: true, timestamp: true}));
  }

  return settings;
};

core.start = function(program, args) {
  var logger = new (winston.Logger)(getLoggerSettings(program.verbose));

  config.use('file', {file: args[0]});

  config.load(function (err, conf) {
    if (err) {
      logger.error('Failed to load configuration from ' + args[0]);
      process.exit(1);
    }

    logger.info('Settings are loaded from a file :' + args[0]);

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
        logger.error("Input module - raise error.");
        logger.error(err);
        process.exit(1);
      }

      logger.info("Input plugin called.");

      for (var i=0; i<outputs.length; i++) {
        filterPlugin.filter(filterArgs, outputs[i], function(err, output){
          if (err) {
            logger.error("Filter module - raise error.");
            logger.error(err);
            process.exit(1);
          }

          logger.info("Filter plugin called.");

          outputPlugin.output(outputArgs, output);
          logger.info("Output finished.");
        });
      }
    });
  });
}

module.exports = core;
