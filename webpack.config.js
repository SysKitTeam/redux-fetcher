const path = require('path');

module.exports = {
    entry: {
        src: './src/index.ts',
        test: './src/fetcher.spec.ts',
        babel: './lib/fetcher.spec.js'
    },

    // entry: {
    //     source: './src/index.ts',
    //     tests: './test/fetcher.spec.ts'
    // },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
}
