const {FORMAT_HTTP_HEADERS, FORMAT_TEXT_MAP, globalTracer, Tags} = require( 'opentracing');
const buildSpan = require('./build-span');

module.exports = function({tracer = globalTracer()} = {}) {

  return (req, res, next) => {
    const wireCtx = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
    const span = buildSpan(req, res,  {childOf: wireCtx});

    span.logEvent("request_received", {});

    // include trace ID in headers so that we can debug slow requests we see in
    // the browser by looking up the trace ID found in response headers
    const responseHeaders = {};
    tracer.inject(span, FORMAT_TEXT_MAP, responseHeaders);
    Object.keys(responseHeaders).forEach(key => res.setHeader(key, responseHeaders[key]));

    req.span = span;

    next();
  };
}
