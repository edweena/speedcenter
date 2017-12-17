//-----------------------------------------
//
// Prod
//
//-----------------------------------------
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const s3config = require('./env.json')


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/js/index',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js'
  },

  plugins: [

    new CleanWebpackPlugin('public'),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/template.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new UglifyJSPlugin(),

    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),


    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'bpm-bpm',
        filename: 'service-worker.js',
        minifiy: true
      }
    ),

    new WebpackPwaManifest({
      name: 's p e e d c e n t e r',
      short_name: 's p e e d c e n t e r',
      description: 'this tells you how fast it is',
      background_color: '#ffffff',
      theme_color: '#000000',
      start_url: '/',
      filename: 'manifest.json',
      icons: [
        {
          src: path.resolve('src/img/hand.png'),
          sizes: [96,128,192,256,384,512]
        }
    ]
    }),


    new S3Plugin({
      s3Options: {
        accessKeyId: s3config.accessKeyId,
        secretAccessKey: s3config.secretAccessKey,
        region: s3config.region
      },

      s3UploadOptions: {
        Bucket: 'bpmbpm'
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
