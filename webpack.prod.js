const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/assets/',
        filename: `app.[hash].js`
    },
    devtool: '#source-map',
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                ecma: 6,
                compress: true,
                output: {
                    comments: false,
                    beautify: false
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
