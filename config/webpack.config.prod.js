const CleanPlugin = require('clean-webpack-plugin');
const paths = require('./paths');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const TsImportPlugin = require('ts-import-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'production',
  resolve:{
    extensions:['.tsx','.ts','.js','.jsx','.json']
  },
  entry:paths.appIndex,
  output:{
    path:paths.appBuild,
    filename:'static/js/[name]-[hash:8].js',
    publicPath: '/',
  },
  devtool:'cheap-module-source-map',
  module:{
    rules:[
      {
        test:/\.js$/,
        loader: 'source-map-loader'//加载devtool的map
      },
      {
        test: /\.(ts|tsx|jsx|js)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              TsImportPlugin({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
              })
            ]
          })
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssPlugin.loader },//这个loader的位置一定不能放错，只能放在style-loader和css-loader之间
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/webpack/postcss.config.js'
              }
            }
          },
          { loader: 'stylus-loader' },
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssPlugin.loader },//这个loader的位置一定不能放错，只能放在style-loader和css-loader之间
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              config: {//path路径是相对于整个项目的根目录
                path: './config/webpack/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          },
        ]
      },
    ]
  },
  optimization:{
    minimizer:[
      new UglifyPlugin({
        cache:true,
        parallel:true,
        sourceMap:true
      }),
      new OptimizeCssPlugin()
    ]
  },
  plugins:[
    new CleanPlugin(),
    new HtmlPlugin({
      title: 'React和TypeScript项目', //此处可动态修改public里的index.html的标题
      template: paths.appHtml, //模板路径
      //favicon只需要在生产模式下设置
      favicon:'./favicon.ico',
      minify: {
        removeComments: true, //去除注释
        collapseWhitespace: true, //去除空格
      }
    }),
    new MiniCssPlugin({
      filename:'static/css/[name]-[contenthash:8].css'
    })
  ]
})
