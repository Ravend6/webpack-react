const path = require('path');
const autoprefixerStylus = require('autoprefixer-stylus');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';

const SRC_DIR = './src';
const DIST_DIR = './dist';
const ASSETS_DIR = './assets';

const plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(NODE_ENV)
  })
];

if (NODE_ENV != 'development') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  plugins.push(new webpack.optimize.OccurenceOrderPlugin(), new webpack.optimize.DedupePlugin());
}

var config = {
  entry: {
    scripts: ['babel-polyfill', SRC_DIR + '/main'],
    styles: [ASSETS_DIR + '/main'],
  },
  output: {
    path: __dirname  + '/dist',
    publicPath: './dist/',
    filename: '[name]-bundle.js'
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      // exclude: [/node_modules/, /public\/bower/],
      include: [
        path.resolve(process.cwd(), SRC_DIR)
      ],
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      }
    }, {
      test: /\.html$/,
      loader: 'raw'
    }, {
      test: /\.styl$/,
      include: [
        path.resolve(process.cwd(), ASSETS_DIR + '/styles')
      ],
      loader: 'style!css!stylus'
    }, {
      test: /\.css$/,
      include: [
        path.resolve(process.cwd(), ASSETS_DIR + '/styles'),
        /node_modules/
      ],
      loader: 'style!css!postcss-loader'
    }, {
      test: /\.scss$/,
      include: [
        path.resolve(process.cwd(), ASSETS_DIR + '/styles')
      ],
      loader: 'style!css!postcss-loader!sass'
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'url?name=[path][name].[ext]'
    }
    // {
    //   test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
    //   include: /node_modules/,
    //   loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
    // }, {
    //   test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
    //   exclude: /node_modules/,
    //   loader: 'file?name=../[path][name].[ext]'
    // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  stylus: {
    use: [autoprefixerStylus({
      browsers: ['last 2 versions']
    })]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],

  // noParse: [
  //   /[\/\\]node_modules[\/\\]angular[\/\\]angular\.js$/
  // ],
  // devServer: {
  //   host: 'localhost',
  //   port: 8000,
  //   contentBase: __dirname + '/public',
  //   // proxy: {
  //   //   '*': 'http://localhost:3000'
  //   // }
  // }

};



module.exports = config;
