const path = require("path")
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const config = require("./config/webpack.config")

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname),
  publicPath: "/public/",
  colors: true,
  hot: true,
  stats: "minimal",
  historyApiFallback: {
    index: "public/index.html"
  }
}).listen(8000, "localhost", (err, result) => {
  if (err)
    console.error(err)
  else
    console.log("Listening at localhost:8000")
})
