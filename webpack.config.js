'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'node',
  entry: [
    './src/renderer/markmap.js',
    './src/renderer/markmap.css'
  ],
  output: {
    path: path.resolve(__dirname, 'out/renderer'),
    filename: 'markmap.bundle.js'
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'markmap.css' })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};
