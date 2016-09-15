const path = require("path")
const webpack = require("webpack")

const outDir = path.join(__dirname, "../public")

const dllManifest = path.join(outDir, 'vendor-manifest.json')

module.exports = {
  devtool: "cheap-module-source-map",
  entry: {
    bundle: path.join(__dirname, "../src/index")
  },
  output: {
    path: outDir,
    filename: "[name].js",
    publicPath: "/public/"
  },
  resolve: {
    extensions: ["", ".js", ".ts", ".tsx"],
    root: path.join(__dirname, "../src"),
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, ".."),
      manifest: require(dllManifest)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["ts-loader"],
        include: path.join(__dirname, "../src"),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
        include: path.join(__dirname, '../src/styles'),
        cacheDirectory: true
      },
    ]
  }
}
