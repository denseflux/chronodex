const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: false,
  devServer: {
    client: {
      reconnect: false,
      webSocketURL: 'wss://urban-system-j45jq9v4vpcgw9-8080.app.github.dev/ws',
    },
    hot: false
  },
  module: {

          

    
    rules: [
      {
        test: /(\.js$|\.jsx?$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              '@babel/env','@babel/react'
            ],
            plugins: [
              '@babel/plugin-transform-class-properties'
            ]
          }
        }
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: "./index.html"
      })
  ]
}
