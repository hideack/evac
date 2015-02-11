'use strict';
var evacUtil = {};

evacUtil.parseSettingFile = function(path, callback){
  var config = require('nconf');

  try {
    config.use('file', {file: path});
    callback(null, config);
  } catch(e) {
    callback(e, null);
  }
}

module.exports = evacUtil;

