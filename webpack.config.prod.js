const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
  NODE_ENV,
} = require('./webpack.constants');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();
const pathSource = path.resolve(__dirname, 'src');

module.exports = {
  bail: true,
  context: pathSource,
  entry: ['@babel/polyfill', './App.js'],
  mode: NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: './',
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
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
        loader: 'file-loader',
        options: {
          name: '[path][name]-[sha512:hash:base64:4].[ext]',
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
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    nodeEnv: NODE_ENV,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
      themeColor: process.env.THEME_COLOR,
      version: process.env.VERSION,
      projectName: process.env.APP_NAME,
      basePath: '/desktop/',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
    }),
    new webpack.ProvidePlugin({}),
    new CopyWebpackPlugin([{
      from: 'assets/images',
      to: 'images',
    }]),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
