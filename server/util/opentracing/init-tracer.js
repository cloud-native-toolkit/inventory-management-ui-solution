const jaeger = require('jaeger-client');
const opentracing = require('opentracing');

const packageConfig = require('../../../package.json');

const serviceName = process.env.IMAGE_NAME || packageConfig.name;

let tracer;
module.exports = function initTracer() {
    if (tracer) {
        return tracer;
    }

    const tags = {};
    tags[`${serviceName}.version`] = packageConfig.version;

    const config = {
        serviceName,
        reporter: {
            logSpans: true
        },
    };
    const options = {
        tags,
    };

    tracer = jaeger.initTracerFromEnv(config, options);

    const codec = new jaeger.ZipkinB3TextMapCodec({ urlEncoding: true });

    tracer.registerInjector(opentracing.FORMAT_HTTP_HEADERS, codec);
    tracer.registerExtractor(opentracing.FORMAT_HTTP_HEADERS, codec);

    opentracing.initGlobalTracer(tracer);

    return tracer;
}
