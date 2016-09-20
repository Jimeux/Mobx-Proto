const path = require("path");
const webpack = require("webpack");

module.exports = {

  devtool: "sourcemap",

  entry: {
    vendor: [
      "cerialize",
      "i18next",
      "i18next-browser-languagedetector",
      "mobx",
      "mobx-react",
      "react",
      "react-addons-css-transition-group",
      "react-bootstrap",
      "react-dom",
      "react-router"
    ]
  },

  output: {
    path: path.join(__dirname, "../public"),
    filename: "[name].dll.js",
    library: "[name]_library"
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../public", "[name]-manifest.json"),
      name: "[name]_library"
    })
  ]

};