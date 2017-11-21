var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonWebConfig = require('./config/webpack-web.common.js');
var commonAdminConfig = require('./config/webpack-admin.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./config/helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = [
    webpackMerge(commonWebConfig, {
        output: {
            path: helpers.root('dist'),
            filename: '_core/web/scripts/[name].js',
        },

        plugins: []
    }),
    webpackMerge(commonAdminConfig, {
        devtool: 'source-map',

        output: {
            path: helpers.root('dist/_core/admin/admin-app'),
            publicPath: '_core/admin/admin-app/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
                mangle: {
                    keep_fnames: true
                }
            }),
            new ExtractTextPlugin('[name].css'),
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(ENV)
                }
            }),
            new webpack.LoaderOptionsPlugin({
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            })
        ]
    })
];
