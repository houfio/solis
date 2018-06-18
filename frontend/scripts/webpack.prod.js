const { join } = require('path');

module.exports = {
  mode: 'production',
  entry: [
    '@babel/polyfill',
    './src/index'
  ],
  output: {
    filename: `solis.[hash:8].js`,
    path: join(__dirname, '..',  'build')
  },
  performance: {
    hints: false
  }
};
