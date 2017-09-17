var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack-web.common.js');
var helpers = require('./helpers');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        filename: '_core/web/scripts/[name].js',
        chunkFilename: '_core/web/scripts/[id].chunk.js'
    },

    plugins: [
        new WriteFilePlugin()
    ],

    devServer: {
        watchContentBase: true
    }
});