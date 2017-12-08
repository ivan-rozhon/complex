var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

const extractSass = new ExtractTextPlugin({
  filename: "[name].css"
});

module.exports = {
  entry: {
    'polyfills': './src/_core/admin/admin-app/polyfills.ts',
    'vendor': './src/_core/admin/admin-app/vendor.ts',
    'app': './src/_core/admin/admin-app/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      helpers.root('node_modules')
    ]
  },

  resolveLoader: {
    modules: [
      helpers.root('node_modules')
    ]
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
        test: /\.(ts|js)$/,
        use: [
          'angular-router-loader'
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
        exclude: helpers.root('src/_core/admin/admin-app', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader?sourceMap' }
          ]
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src/_core/admin/admin-app', 'app'),
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src/_core/admin/admin-app', 'app'),
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
        include: helpers.root('src/_core/admin/admin-app', 'app'),
        use: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      }
    ]
  },

  plugins: [
    // Workaround for https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,

      // FIX: https://github.com/angular/angular/issues/11580
      // /angular(\\|\/)core(\\|\/)@angular/,

      // https://github.com/angular/angular/issues/20357
      /\@angular(\\|\/)core(\\|\/)esm5/,
      helpers.root('./src/_core/admin/admin-app'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    extractSass
  ]
};