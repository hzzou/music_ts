module.exports = {
  plugins:[
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage:3
    }),
    require('postcss-pxtorem')({
      rootValue:75,
      propList: ['*', '!font*'],
      selectorBlackList: [/ant*/], //保留为px
      minPixelValue:2
    })
  ]
}