const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './public/index.tsx',
  context: path.resolve(__dirname, './'),
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isProd ? '[name]-[fullhash].js' : '[name].js',
    chunkFilename: isProd ? '[name]-[fullhash].js' : '[name].js',
    publicPath: '/',
  },
  target: 'web',
  stats: { modules: false },
  devServer: {
    port: '3001',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'assets', 'favicon.ico'),
    }),
  ],
};
