module.exports = {}
// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
module.exports = {
  configureWebpack: (config) => {
    return {
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
          threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
          deleteOriginalAssets: false, // 是否删除原文件
        }),
      ],
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/assets/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/common.scss";',
      },
    },
  },
  publicPath: '/lottery',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    sockHost: 'http://0.0.0.0:8080',
    proxy: {
      '/api': {
        target: 'http://10.8.8.230:18004/',
        ws: true,
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://10.8.8.230:18004/',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
}
