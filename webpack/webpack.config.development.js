import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const root = process.cwd();
const src = path.join(root, 'src');
const clientSrc = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');

const clientInclude = [clientSrc, universalSrc];

export default {
  devtool: 'eval',
  context: src,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './client/client.jsx',
    ],
  },
  output: {
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, 'build'),
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NormalModuleReplacementPlugin(/\.\/async/, './sync'),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __PRODUCTION__: false,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [src, universalSrc, 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.png|\.jpg/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },

      // Javascript
      {
        test: /\.js|\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', ['es2015', { modules: false }], 'stage-0'],
          plugins: ['react-hot-loader/babel'],
        },
        include: clientInclude,
      },
      {
        test: /\.js|\.jsx$/,
        loaders: 'eslint-loader',
        include: src,
        options: {
          fix: true,
          emitWarning: true,
        },
      },

      // CSS
      {
        test: /\.css$/,
        include: clientInclude,
        exclude: /global\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /global\.css$/,
        include: universalSrc,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
