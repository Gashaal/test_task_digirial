const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/containers/Root'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  }
}
