var webpack = require('webpack');
var helpers = require('./helpers');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "_core/web/styles/web.css"
});

module.exports = {
    entry: {
        'polyfills': './src/_core/web/scripts/polyfills.ts',
        'vendor': './src/_core/web/scripts/vendor.ts',
        'web': './src/_core/web/scripts/web.ts'
    },

    context: path.join(__dirname, '../.'),

    resolve: {
        // `.ts` and `.tsx` (typescript) as a resolvable extension
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: [{
                    loader: 'file-loader', options: {
                        name: '[name].[ext]',
                        outputPath: '_core/web/assets/',
                        publicPath: '../../../'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader?sourceMap' }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins: [
        // creates a separate file (known as a chunk), consisting of common modules shared between multiple entry points
        new webpack.optimize.CommonsChunkPlugin({
            name: ['web', 'vendor', 'polyfills']
        }),

        // inject ES5 modules as global vars
        new webpack.ProvidePlugin({
            // make jQuery and $ global
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            // RxJS | https://github.com/reactivex/rxjs
            Rx: 'rxjs',
            // UIkit | https://getuikit.com/
            UIkit: 'uikit'
        }),

        extractSass,
        new ExtractTextPlugin('_core/web/styles/[name].css'),

        new CopyWebpackPlugin([
            {
                from: 'src',
                to: ''
            }
        ], {
                ignore: [
                    // Doesn't copy any files with/in...
                    '*.js',
                    '*.ts',
                    '*.scss',
                    '*.less',
                    '_core/admin/admin-app/**/*'
                ],

                // By default, we only copy modified files during
                // a watch or webpack-dev-server build. Setting this
                // to `true` copies all files.
                copyUnmodified: true
            })
    ]
};