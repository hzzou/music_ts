const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
//随便此处怎么命名，html模板里的名字都为htmlWebpackPlugin
const HtmlPlugin = require('html-webpack-plugin');
const TsImportPlugin = require('ts-import-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  entry: [
    paths.appIndex
  ],
  devtool:'cheap-module-eval-source-map',
  output:{
    filename:'static/js/boundle.js',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g,'/'),
    publicPath:'/',
  },
  module:{
    rules:[
      {
        enforce: 'pre',//先执行
        test: /\.js$/,
        loader: 'source-map-loader'//加载devtool的map
      },
      {
        test:/\.(ts|tsx|js|jsx)$/,
        loader:'ts-loader',
        options:{
          transpileOnly:true,
          getCustomTransformers:()=>({
            before:[
              TsImportPlugin({
                libraryName:'antd',
                librayrDirectory:'lib',
                style:true
              })
            ]
          })
        }
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
        loader:'url-loader'
      },
      {
        test:/\.styl$/,
        use:[
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader',
            options: {
              config: {
                path: './config/postcss.config.js'
              }
            }
          },
          {
            loader:'stylus-loader'
          }
        ]
      },
      {
        test:/\.(less|css)/,
        use:[
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled:true
            }
          }
        ]
      }
    ]
  },
  devServer:{
    historyApiFallback: true, //任意的 404 响应都可能需要被替代为 index.html
    host:'localhost',
    port:'8070',
    hot:true,
    open:true,
    clientLogLevel:'none',
    watchContentBase:true,
    publicPath:'/'
  },
  plugins:[
    new HtmlPlugin({//HtmlPlugin
      title:'React和Typescript项目',
      template:paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})