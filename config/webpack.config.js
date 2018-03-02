const path = require('path');
const helpers = require('./helpers');

module.exports = {
    entry: {
        main: './src/index.ts',
        test: './test/liveTest.ts'
    },
    output: {
        path: path.normalize(path.join(__dirname, '../dist')),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: helpers.root('src'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
