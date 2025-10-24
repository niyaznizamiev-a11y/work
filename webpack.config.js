const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js', // Измените на .js вместо .tsx
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    port: 3000,
    open: true
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Добавьте разрешения для TypeScript
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Правило для TypeScript и TSX файлов
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          },
        ]
      }
    ]
  }
};