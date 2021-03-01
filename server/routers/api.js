const express = require('express');
const proxy = require("express-http-proxy");
const opentracingMiddleware = require("../util/opentracing/opentracing-middleware");
const tracerHeaderInjector = require('../util/opentracing/tracer-header-injector');

const apiHost = process.env.API_HOST || 'localhost:3002';

module.exports = function(app){
  console.log(`Proxying /api requests to ${apiHost}`);

  app.use('/api', opentracingMiddleware())
  app.use('/api', proxy(apiHost, {
    proxyReqOptDecorator: tracerHeaderInjector
  }));
};
