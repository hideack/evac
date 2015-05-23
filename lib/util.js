'use strict';
var evacUtil = {};
var config = require('nconf');
var path = require('path');
var yaml = require('js-yaml');
var __ = require('underscore');

evacUtil.parseSettingFile = function(filePath, callback){
  var settings = {file: filePath};

  if (path.extname(filePath) == ".yaml" || path.extname(filePath) == ".yml") {
    settings.format = {
      parse: yaml.safeLoad,
      stringify: yaml.safeDump
    };
  }

  try {
    config.use('file', settings);
    config.load(function (err, conf) {
      if (__.has(conf, '0')) {
        conf = __.values(conf);
      }

      var pluginType = ['out', 'filter', 'in'];
      pluginType.forEach(function(type) {
        for (var plugin in conf[type]) {
          if (conf[type][plugin] == null) {
            conf[type][plugin] = {};
          }
        }
      })

      callback(false, conf);
    });
  } catch(e) {
    callback(e, null);
  }
}

module.exports = evacUtil;

