var vue = require('vue-loader')

module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.css$/, 
        loader: "style!css"
      },
      {
        test: /\.vue$/,
        loader: vue.withLoaders({})
      }
    ]
  }
}
