var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
    root: path.join(__dirname, 'src')
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['ts-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
