const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  colors: true,
  stats: 'minimal',
  historyApiFallback: true
}).listen(8000, 'localhost', (err, result) => {
  if (err)
    console.error(err)
  else
    console.log('Listening at localhost:8000')
})
