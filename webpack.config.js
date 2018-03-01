const path = require('path');

module.exports = {
    // entry: './src/index.ts',
    // output: {
    //     path: path.join(__dirname, '/lib'),
    //     filename: 'bundle.js',
    // },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
