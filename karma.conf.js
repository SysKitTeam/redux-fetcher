const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
        files: [
            "./test/*.spec.ts",
            "./src/*.ts"
        ],
        exclude: [
        ],
        preprocessors: {
            "./test/*.spec.ts": ['webpack'],
            "./src/*.ts": ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: false
        }
    })
}
