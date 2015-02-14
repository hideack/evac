'use strict';
var evacUtil = {};
var config = require('nconf');
var path = require('path');
var yaml = require('js-yaml');

evacUtil.parseSettingFile = function(filePath, callback){
  var settings = {file: filePath};

  if (path.extname(filePath) == ".yaml" || path.extname(filePath) == ".yml") {
    settings.format = {
      parse: yaml.safeLoad,
      stringify: yaml.safeDump
    };
  }

  console.log(settings);

  try {
    config.use('file', settings);
    callback(false, config);
  } catch(e) {
    callback(e, null);
  }
}

module.exports = evacUtil;

