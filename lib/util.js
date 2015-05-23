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
      var nullToObject = function(recipe) {
        var pluginType = ['out', 'filter', 'in'];
        pluginType.forEach(function(type) {
          for (var plugin in recipe[type]) {
            if (recipe[type][plugin] == null) {
              recipe[type][plugin] = {};
            }
          }
        });

        return recipe;
      };

      if (__.has(conf, '0')) {
        conf = __.values(conf);
      }

      if (Array.isArray(conf)) {
        __.map(conf, nullToObject);
      } else {
        conf = nullToObject(conf);
      }

      callback(false, conf);
    });
  } catch(e) {
    callback(e, null);
  }
}

module.exports = evacUtil;

