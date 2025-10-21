const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    port: 3000,
    open: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};