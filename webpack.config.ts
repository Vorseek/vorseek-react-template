import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { isFilledItemData } from './src/utils/typeguards';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  entry: './src/index.tsx',
  context: path.resolve(__dirname, './'),
  mode: isDevelopment ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isDevelopment ? '[name].js' : '[name]-[fullhash].js',
    chunkFilename: isDevelopment ? '[name].js' : '[name]-[fullhash].js',
    clean: true,
  },
  stats: { modules: false, chunks: !isDevelopment, assets: false },
  devtool: isDevelopment ? 'eval-source-map' : false,
  devServer: {
    port: '3001',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
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
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
    }),
    // Webpack plugin to enable "Fast Refresh" (also known as Hot Reloading) for React components.
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(isFilledItemData),
};

export default config;
