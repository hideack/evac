// ref: https://github.com/npms-io/npms-analyzer

'use strict';

const http = require('http');
const https = require('https');

const originalRequests = { http: http.request, https: https.request };
const sepia = require('sepia');
const sepiaRequests = { http: http.request, https: https.request };

/**
 * Turns sepia on.
 */
function enable() {
    http.request = sepiaRequests.http;
    https.request = sepiaRequests.https;
}

/**
 * Turns sepia off.
 */
function disable() {
    http.request = originalRequests.http;
    https.request = originalRequests.https;
}

disable();

sepia.enable = enable;
sepia.disable = disable;

module.exports = sepia;
