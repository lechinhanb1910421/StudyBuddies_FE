const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
  },
  devServer: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080/nlcntt/api/'
    //   }
    // }
  }
})
