'use strict';
var core = {};
var config = require('nconf');
var winston = require('winston');
var CronJob = require('cron').CronJob;
var logger;

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

var parseRecipeFile = function(path) {
  config.use('file', {file: path});
  config.load(function (err, conf) {
    if (err) {
      logger.error('Failed to load configuration from ' + args[0]);
      process.exit(1);
    }

    core.parseRecipeJson(conf);
  });
};

var parseCronFile = function(path) {
  config.use('file', {file: path});
  config.load(function (err, cronConfig) {
    if (err) {
      logger.error('Failed to load configuration from ' + args[0]);
      process.exit(1);
    }

    var jobs = [];

    for(var config in cronConfig) {
      var oneConfig = cronConfig[config];

      for (var schedule in oneConfig) {
        var job = new CronJob({
          cronTime: schedule,
          onTick: function() {
            parseRecipeFile(oneConfig[schedule]);
          },
          start: true
        });
      }
    }
  });
};

core.parseRecipeJson = function(recipe) {
  var inputPlugin, filterPlugin, outputPlugin,
      inputArgs, filterArgs, outputArgs;

  for (var plugin in recipe.out) {
    var pluginFileName = __dirname + '/plugin/out/' + plugin.toLowerCase() + '.js';
    outputPlugin = require(pluginFileName);
    outputArgs = recipe.out[plugin];
  }

  for (var plugin in recipe.filter) {
    var pluginFileName = __dirname + '/plugin/filter/' + plugin.toLowerCase() + '.js';
    filterPlugin = require(pluginFileName);
    filterArgs = recipe.filter[plugin];
  }

  for (var plugin in recipe.in) {
    var pluginFileName = __dirname + '/plugin/in/' + plugin.toLowerCase() + '.js';
    inputPlugin = require(pluginFileName);
    inputArgs = recipe.in[plugin];
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

        outputPlugin.output(outputArgs, output, function(err, output){
          logger.info("Output plugin received: " + output);
          logger.info("Output finished.");
        });
      });
    }
  });
};

core.start = function(program, args) {
  logger = new (winston.Logger)(getLoggerSettings(program.verbose));

  if (program.cron) {
    // cron mode
    parseCronFile(args[0]);
  } else {
    // normal mode
    logger.info('Settings are loaded from a file :' + args[0]);
    parseRecipeFile(args[0]);
  }
}

module.exports = core;
