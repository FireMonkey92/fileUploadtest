// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

const {
  NODE_ENV,
  HOST,
  PORT,
  CONNECTION_TYPE,
  APP_NAME,
  VERSION,
  THEME_COLOR,
  PROXY_URL,
} = require('./webpack.constants');

const pathSource = path.resolve(__dirname, 'src');

const proxyConfig = PROXY_URL
  ? {
    proxy: {
      '/api/*': {
        target: PROXY_URL,
        pathRewrite: {'^/api/': ''},
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        proxyTimeout: 1e3 * 60 * 5,
      },
    },
  }
  : {};

module.exports = {
  context: pathSource,
  entry: ['@babel/polyfill', './App.js'],
  mode: NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.pdf$/i,
        loader: 'file?name=[path][name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|mp4)$/i,
        loader: 'url-loader',
        options: {
          name: '[path][name]-[sha512:hash:base64:4].[ext]',
          limit: 16384,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  optimization: {
    minimize: false,
    nodeEnv: NODE_ENV,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({}),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      themeColor: THEME_COLOR,
      version: VERSION,
      projectName: APP_NAME,
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new CopyWebpackPlugin([{
      from: 'assets/images',
      to: 'images',
    }]),
    new Dotenv(),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  devtool: 'source-map',
  devServer: {
    port: PORT,
    host: HOST,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    https: CONNECTION_TYPE === 'https',
    stats: {
      assets: false,
      children: false,
      colors: true,
      entrypoints: false,
      env: true,
      modules: false,
      moduleTrace: false,
    },
    ...proxyConfig,
  },
};
