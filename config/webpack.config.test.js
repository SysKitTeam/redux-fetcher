'use strict'

const { resolve } = require('path');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = options => {
    return {

        /**
         * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
         *
         * Do not change, leave as is or it wont work.
         * See: https://github.com/webpack/karma-webpack#source-maps
         */
        devtool: 'inline-source-map',

        /**
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {

            /**
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: ['.ts', '.tsx', '.js', '.json'],

            /**
             * Make sure root is src
             */
            modules: [resolve(__dirname, 'src'), 'node_modules']

        },

        /**
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.tsx$/,
                    loader: 'source-map-loader',
                    // exclude: [
                    //     // these packages have problems with their sourcemaps
                    //     helpers.root('node_modules/rxjs'),
                    // ]
                },

                /**
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 */
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader',
                    query: {
                        // use inline sourcemaps for "karma-remap-coverage" reporter
                        sourceMap: false,
                        inlineSourceMap: true,
                        compilerOptions: {

                            // Remove TypeScript helpers to be injected
                            // below by DefinePlugin
                            removeComments: true

                        }
                    },
                    exclude: [/\.e2e\.ts$/]
                },
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    // include: helpers.root('src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }

            ]
        },

        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        },

        externals: {
            'jsdom': 'window',
            'cheerio': 'window',
            'react/lib/ExecutionEnvironment': 'true',
            'react/addons': 'true',
            'react/lib/ReactContext': 'window'
        }

    };
}