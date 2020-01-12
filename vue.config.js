const path = require('path');
const port = 8080;

function resolve(dir) {
  return path.join(__dirname, dir);
}
const isProduction = process.env.VUE_APP_ENV == 'production';

// vue.config.js
module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  lintOnSave: false,
  productionSourceMap: false,
  parallel: isProduction,
  css: {
    extract: isProduction,
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    modules: false, // 启用 CSS modules for all css / pre-processor files.
    loaderOptions: {
      postcss: {
        sourceMap: true
      }
    }
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/bom': {
        target: 'https://testerp.yktour.com.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/bom': '/bom'
        }
      },
      '/ykly-app': {
        target: 'https://testapp.yktour.com.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/ykly-app': '/ykly-app'
        }
      },
      '/api': {
        target: 'https://testerp.yktour.com.cn/', // 测试服
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    // cacheBusting: false,
    resolve: {
      alias: {
        src: resolve('src'),
        'vue$': 'vue/dist/vue.js',
        '@': resolve('src')
      }
    },
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
  }
};
