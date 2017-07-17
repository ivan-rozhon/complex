var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});

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
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('', 'tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src/_core/admin2/admin-app', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader?sourceMap' }
          ]
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src/_core/admin2/admin-app', 'app'),
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src/_core/admin2/admin-app', 'app'),
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', query: { modules: true, importLoaders: 2 } },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader', options: {} }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.scss$/,
        include: helpers.root('src/_core/admin2/admin-app', 'app'),
        use: ['raw-loader', { loader: 'sass-loader', options: { importLoaders: 1 } }, 'postcss-loader'] // sass-loader not scss-loader
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
    }),

    extractSass
  ]
};