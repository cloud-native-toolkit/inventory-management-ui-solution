const {FORMAT_HTTP_HEADERS, globalTracer} = require('opentracing');
const buildSpan = require('./build-span');

module.exports = function(proxyReqOpts, srcReq) {

    const headers = buildTracerHeaders(srcReq);

    console.log('Injecting trace headers', headers);

    return Object.assign(proxyReqOpts, {headers});
}

function buildTracerHeaders(req, res) {
    const tracer = globalTracer();

    const requestSpan = req.span || buildSpan(req, res);

    const headers = {};
    tracer.inject(requestSpan, FORMAT_HTTP_HEADERS, headers);

    return headers;
}
