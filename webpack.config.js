const path = require("path")
const webpack = require("webpack")

module.exports = {
  devtool: "cheap-module-source-map",
  entry: [
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: ["", ".js", ".ts", ".tsx"],
    root: path.join(__dirname, "src")
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ["ts-loader"],
      include: path.join(__dirname, "src")
    }]
  }
}
