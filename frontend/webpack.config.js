const { NoEmitOnErrorsPlugin, ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
  return merge({
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.graphql'
      ]
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: [
            'tslint-loader'
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                silent: true,
                useBabel: true,
                babelOptions: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        targets: {
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'not ie < 9'
                          ]
                        },
                        shippedProposals: true
                      }
                    ]
                  ],
                  plugins: env !== 'dev' ? [] : [
                    'react-hot-loader/babel'
                  ]
                },
                babelCore: '@babel/core'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.graphql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.png$/,
          exclude: /node_modules/,
          loader: 'file-loader'
        }
      ]
    }
  }, require(`./scripts/webpack.${env}`))
};
