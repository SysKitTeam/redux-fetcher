module.exports = {
    entry: './src/fetcher.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.tsx?$/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader',
            //     exclude: /node_modules/
            // }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
}
