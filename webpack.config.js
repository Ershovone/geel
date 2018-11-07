let CompressionPlugin = require('compression-webpack-plugin');
let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let autoprefixer = require('autoprefixer');
const config = require('./config.js');

let AssetsPlugin = require('assets-webpack-plugin');
let assetsPluginInstance = new AssetsPlugin();

let publicPath = process.env.NODE_ENV === 'production' ? '' : `http://${config.ip}:3003/`;
let cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
let jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';
let mode = 'development';

let plugins = [ new webpack.DefinePlugin({
  'process.env': {
    BROWSER: JSON.stringify(true),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }
}), new ExtractTextPlugin({
  filename: cssName,
  disable: false,
  allChunks: true
}) ];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  plugins.push(new CleanWebpackPlugin([ 'public/assets/' ], {
    root: __dirname,
    exclude: [ 'images', 'docs', 'bg', 'tour', 'favicons', 'error', 'imgs', 'flags', 'robots.txt', 'sitemap.xml', 'googleb55842b2ca8472fa.html', 'misc' ],
    verbose: true,
    dry: false
  }));
  plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [ autoprefixer() ]
    }
  }));
  plugins.push(assetsPluginInstance);
  plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip', test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }));
} else {
  plugins.push(new webpack.LoaderOptionsPlugin({
    debug: true
  }));
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  mode,
  entry: [ 'babel-polyfill', 'react-hot-loader/patch', './src/client.js' ], resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [ path.join(__dirname, 'src'), 'node_modules' ]
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  }, module: {
    rules: [ {
      test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: 'css-loader!postcss-loader'
      })
    }, {
      test: /\.less$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: 'css-loader!postcss-loader!less-loader'
      })
    }, {
      test: /\.gif$/, use: [ {
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      } ]
    }, {
      test: /\.jpg$/, use: [ {
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      } ]
    }, {
      test: /\.png$/, use: [ {
        loader: 'url-loader?limit=10000&mimetype=image/png'
      } ]
    }, {
      test: /\.svg/, use: [ {
        loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
      } ]
    }, {
      test: /\.(woff|woff2|ttf|eot)/, use: [ {
        loader: 'url-loader?limit=1'
      } ]
    }, {
      enforce: 'pre', test: /\.jsx?$/, exclude: [ /node_modules/, /public/ ], use: [ {
        loader: 'eslint-loader'
      } ]
    }, {
      test: /\.jsx?$/, exclude: [ /node_modules/, /public/ ], use: [ {
        loader: 'babel-loader'
      } ]
    } ]
  },
  devtool: process.env.NODE_ENV === 'production' ? '' : 'eval',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true
  }
};
