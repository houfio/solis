const { HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    filename: 'index.js',
    publicPath: `http://localhost:${port}/`
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      colors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port
  }
};
