const {globalTracer, Tags} = require('opentracing');
const url = require('url');

module.exports = function(req, res, spanOptions) {
    const tracer = globalTracer();

    const span = tracer.startSpan(req.path, spanOptions);

    span.setTag(Tags.HTTP_METHOD, req.method);
    span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_SERVER);
    span.setTag(Tags.HTTP_URL, req.url);

    span.logEvent('request_received', {});

    const pathname = url.parse(req.url).pathname;

    const finishSpan = () => {
        span.logEvent("request_finished", {});
        // Route matching often happens after the middleware is run. Try changing the operation name
        // to the route matcher.
        const opName = (req.route && req.route.path) || pathname;
        span.setOperationName(opName);
        span.setTag("http.status_code", res.statusCode);
        if (res.statusCode >= 500) {
            span.setTag(Tags.ERROR, true);
            span.setTag(Tags.SAMPLING_PRIORITY, 1);
        }
        span.finish();
    };

    req.on('error', (error) => {
        span.setTag(Tags.ERROR, true);
        span.setTag(Tags.HTTP_STATUS_CODE, error.status);
        span.log({
            event: 'error',
            message: error.message,
            err: error,
        });
    });
    req.on('response', (res) => {
        span.setTag(Tags.HTTP_STATUS_CODE, res.status);
    });
    req.on('end', () => {
        span.finish();
    });
    res.on('finish', finishSpan);

    return span;
}
