const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  // 配置路径别名，简化书写的同时保证了路径的正确性，脚手架3及以上
  configureWebpack: {
    resolve: {
      alias: {
        // 配置方式如下，只有那些经常需要用到的文件夹配了才有意义
        // 别名: '@/文件夹名'
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        // 使用方式：在路径的最开始写上别名，就会从相对应的文件夹开始寻找对应文件
      },
    },
  },
});
