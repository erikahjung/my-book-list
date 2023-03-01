const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true
  },
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.join(__dirname, 'build')
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: "index.html"
    })
  ]
}