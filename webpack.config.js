const { resolve } = require('path');
const StaticWebpackPlugin = require('static-site-generator-webpack-plugin');

const data = {
  routes: [
    '/',
    '/about'
  ]
};

module.exports = env => {
  return {
    context: resolve(__dirname, './app'),
    entry: {
      app: './index.jsx'
    },
    output: {
      filename: '[name].[chunkhash].bundle.js',
      path: resolve(__dirname, './dist'),
      pathInfo: !env.prod,
      chunkFilename: '[chunkhash].js',
      libraryTarget: 'umd'
    },
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: [
            'babel-loader'
          ]
        }
      ],
    },
    plugins: [
      new StaticWebpackPlugin('app', data.routes)
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modules: [
        resolve('./app'),
        'node_modules'
      ]
    },
    devServer: {
      contentBase: './app'
    }
  };
};
