const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/assets/',
        path: path.resolve(__dirname, '../assets/seller'),
        filename: `app.[contenthash].js`
    },
    devtool: '#source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                    output: {
                        comments: false,
                    }
                }
            })
        ]
    }
});
module.exports.plugins = (common.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
]);
