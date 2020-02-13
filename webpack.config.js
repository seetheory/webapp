const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx',],
  output: {
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
    extensions: ['*', '.ts', '.tsx', '.js', '.vue'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/',
    compress: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/[0-9A-Za-z-/]+$/, to: '/index.html' }],
      index: 'index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.ejs',
      filename: 'index.html',
      inlineSource: '.(js|css)',
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ]
}
