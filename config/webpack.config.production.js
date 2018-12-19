module.exports = {
  output: {
    filename: '[name].js', // 生成文件名[name].[chunkhash]
    publicPath: '/js' // 生成的JS文件插入到html页面的前缀
  },
}
