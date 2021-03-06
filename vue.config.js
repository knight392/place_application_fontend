// vue.config.js

module.exports = {
  chainWebpack: config => {
    config.output.filename('[name].[hash].js').end();
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        store: '@/store'
      }
    }
  },

  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "0.0.0.0",
    port: 80, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个跨域
      "/": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true, //websocket支持
        secure: false,
        pathRewrite: {
          "^/": "" 
        }
      }
    }
  }
}

