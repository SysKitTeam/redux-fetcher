const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            "../test/**/*_spec.ts"
        ],
        exclude: [
        ],
        preprocessors: {
            "../test/**/*_spec.ts": ['webpack']
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity,
        webpack: webpackConfig,
        mime: {
            'text/x-typescript': ['ts']
        }
    })
}
