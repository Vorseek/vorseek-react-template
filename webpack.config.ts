import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
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
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isDevelopment,
    filename: isDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[name]-[contenthash:8].chunk.js',
    chunkFilename: isDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[name]-[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    clean: true,
  },
  stats: 'errors-warnings',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-framework',
          chunks: 'all',
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
      chunks: 'all',
      maxInitialRequests: 30,
      maxAsyncRequests: 30,
      maxSize: 250000,
    },
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              minify: {
                mangle: true,
              },
              parser: {
                syntax: 'typescript',
                tsx: true,
                dynamicImport: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
      inject: true,
      minify: isDevelopment
        ? undefined
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
    }),
    // Webpack plugin to enable "Fast Refresh" (also known as Hot Reloading) for React components.
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(isFilledItemData),
};

export default config;
