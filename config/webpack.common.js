var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/_core/admin2/admin-app/polyfills.ts',
    'vendor': './src/_core/admin2/admin-app/vendor.ts',
    'app': './src/_core/admin2/admin-app/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('', 'tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src/_core/admin2/admin-app', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src/_core/admin2/admin-app', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,

      // FIX: https://github.com/angular/angular/issues/11580
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src/_core/admin2/admin-app'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};