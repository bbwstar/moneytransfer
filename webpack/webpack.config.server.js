import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Paths
const root = process.cwd();
const src = path.join(root, 'src');
const build = path.join(root, 'build');
const universalSrc = path.join(src, 'universal');
const serverSrc = path.join(src, 'server');

const serverInclude = [serverSrc, universalSrc];

export default {
  context: src,
  entry: {
    prerender: [
      './universal/components/Loading/Loading.jsx', // We need to load css of the component in prerender.css
      './universal/routes/Routes.jsx',
    ],
  },
  target: 'node',
  output: {
    path: build,
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [src, universalSrc, 'node_modules'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NormalModuleReplacementPlugin(/routes\/async/, 'sync.jsx'),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __PRODUCTION__: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(png|j|jpeg|gif|svg|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },

      {
        test: /\.css$/,
        include: serverInclude,
        exclude: /global\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root: src,
                url: false,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /global\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.js|\.jsx$/,
        loader: ['babel-loader', 'eslint-loader'],
        include: serverInclude,
      },
    ],
  },
};
