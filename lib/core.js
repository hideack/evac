'use strict';
var core = {};
var fs = require('fs');
var mkdirp = require('mkdirp');
var config = require('nconf');
var winston = require('winston');
var CronJob = require('cron').CronJob;
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

var logger = new (winston.Logger)(getLoggerSettings(false));
var pluginPaths = [__dirname + '/plugin'];

var parseRecipeFile = function(path) {
  try {
    config.use('file', {file: path});
  } catch(e) {
    logger.error("Error parsing your evac recipe file.");
    process.exit(1);
  }

  config.load(function (err, conf) {
    if (err) {
      logger.error('Failed to load configuration from ' + path);
      process.exit(1);
    }

    core.parseRecipeJson(conf, function(err, message){
      if (err) {
        logger.error(message + " plugin - raise error.");
        logger.error(err);
        process.exit(1);
      }
    });
  });
};

var parseCronFile = function(path) {
  try {
    config.use('file', {file: path});
  } catch(e) {
    logger.error("Error parsing your cron configuration file.");
    process.exit(1);
  }

  config.load(function (err, cronConfig) {
    if (err) {
      logger.error('Failed to load configuration from ' + path);
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

core.parseRecipeJson = function(recipe, callback) {
  if (!recipe.filter) {
    recipe.filter = {
      "through": {}
    };
  }

  var pluginType = ['out', 'filter', 'in'];
  var plugins = {};
  var args = {};

  pluginType.forEach(function(type) {
    for (var plugin in recipe[type]) {
      pluginPaths.forEach(function(path) {
        var pluginFileName = path + '/' + type + '/' + plugin.toLowerCase() + '.js';
        logger.debug("Search plugin : " + pluginFileName);

        if (fs.existsSync(pluginFileName)) {
          plugins[type] = require(pluginFileName);
          args[type] = recipe[type][plugin];
        }
      });
    }

    if (!plugins[type]) {
      callback("Plugin not found.", "Not defined.");
      return;
    }
  });

  try {
    plugins['in'].load(args['in'], function(err, outputs){
      if (err) {
        callback(err, "input");
        return;
      }

      logger.info("Input plugin called.");

      for (var i=0; i<outputs.length; i++) {
        plugins['filter'].filter(args['filter'], outputs[i], function(err, output){
          if (err) {
            callback(err, "filter");
            return;
          }

          logger.info("Filter plugin called.");

          if (output == "") {
            logger.info("Filter plugin no output.");
          } else {
            plugins['out'].output(args['out'], output, function(err, output){
              if (err) {
                callback(err, "output");
                return;
              }

              logger.info("Output plugin received: " + output);
              logger.info("Output finished.");

              callback(false, null);
              return;
            });
          }

        });
      }
    });
  } catch(e) {
    logger.error(e.message);
    callback(e, e.message);
    return;
  }
};

core.start = function(program, args) {
  mkdirp.sync(process.env.HOME + "/.evac");

  logger = new (winston.Logger)(getLoggerSettings(program.verbose));

  if (program.path) {
    pluginPaths.push(program.path);
  }

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
