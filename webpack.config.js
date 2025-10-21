const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[contenthash].main.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            use: ["style-loader", "css-loader"],
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}; 