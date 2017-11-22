var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonWebConfig = require('./config/webpack-web.common.js');
var commonAdminConfig = require('./config/webpack-admin.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./config/helpers');

module.exports = [
    webpackMerge(commonWebConfig, {
        devtool: 'cheap-module-eval-source-map', // Chrome: Associated files are aviable via file tree (ng://) or Ctrl + P

        output: {
            path: helpers.root('dist'),
            filename: '_core/web/scripts/[name].js',
        },

        plugins: []
    }),
    webpackMerge(commonAdminConfig, {
        devtool: 'cheap-module-eval-source-map', // Chrome: Associated files are aviable via file tree (ng://) or Ctrl + P

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
            new webpack.LoaderOptionsPlugin({
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            })
        ]
    })
];
