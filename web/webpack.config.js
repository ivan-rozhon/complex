const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./config/helpers');

function getStylesRulesConfig() {
  let sassImplementation;

  try {
    // tslint:disable-next-line:no-implicit-dependencies
    sassImplementation = require('node-sass');
  } catch {
    sassImplementation = require('sass');
  }

  return {
    test: /\.scss$|\.sass$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      'css-loader',
      'postcss-loader',
      {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: sassImplementation,
          sourceMap: true,
          sassOptions: {
            // bootstrap-sass requires a minimum precision of 8
            precision: 8,
            // Use expanded as otherwise sass will remove comments that are needed for autoprefixer
            // Ex: /* autoprefixer grid: autoplace */
            // tslint:disable-next-line: max-line-length
            // See: https://github.com/webpack-contrib/sass-loader/blob/45ad0be17264ceada5f0b4fb87e9357abe85c4ff/src/getSassOptions.js#L68-L70
            outputStyle: 'expanded',
          },
        },
      },
    ],
  }
}

module.exports = {
  entry: {
    'polyfills': './src/_core/web/scripts/polyfills.ts',
    'vendor': './src/_core/web/scripts/vendor.ts',
    'web': './src/_core/web/scripts/web.ts'
  },

  devtool: 'inline-source-map',

  context: path.join(__dirname),

  resolve: {
    // `.ts` and `.tsx` (typescript) as a resolvable extension
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader?sourceMap' }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [{
          loader: 'file-loader', options: {
            name: '[name].[ext]',
            outputPath: '_core/web/assets/',
            publicPath: '../assets/',
          }
        }]
      },
      getStylesRulesConfig()
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    path: helpers.root('dist'),
    filename: '_core/web/scripts/[name].js',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '_core/web/styles/[name].css'
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: 'src',
            to: '',
            globOptions: {
              ignore: [
                // Doesn't copy any files with/in...
                '**/*.js',
                '**/*.ts',
                '**/*.scss',
                '**/*.less',
              ]
            }
          }
        ]
      }
    )
  ]
};