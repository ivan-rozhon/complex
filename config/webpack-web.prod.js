var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack-web.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('dist'),
        filename: '_core/web/scripts/[name].js',
    },

    plugins: []
});