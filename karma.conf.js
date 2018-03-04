const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            "./test/**/*_spec.ts",
            "./src/**/*.ts"
        ],
        exclude: [
        ],
        preprocessors: {
            "./test/**/*_spec.ts": ['webpack'],
            "./src/**/*.ts": ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        webpack: webpackConfig,
        mime: {
            'text/x-typescript': ['ts']
        }
    })
}
