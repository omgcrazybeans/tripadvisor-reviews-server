var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {test: /\.js$/, include : SRC_DIR, exclude: /node_modules/, use: {loader: 'babel-loader'}},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
      {test: /\.svg$/, use: ['@svgr/webpack']},
      {test: /\.svg$/, use: [{loader: 'svg-url-loader', options: {limit: 10000}}]}
    ]
  }
};
