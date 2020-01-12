// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

const test = process.argv.indexOf("--test")
var env;
if (test === -1) {
  env = require('./prod.env');
} else {
  env = require('./test.env');
}

module.exports = {
  build: {
    env: env,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'https://xmstatic.yktour.com.cn/bom',//测试环境
    assetsPublicPath: process.argv.indexOf("--test") === -1 ? 'https://static.yktour.com.cn/bom/' : 'https://teststatic.yktour.com.cn/bom/',//正式环境
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: false, // process.env.npm_config_report

  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/bom': {
        target: 'https://testerp.yktour.com.cn/',
        // target: 'http://localbom.yktour.com.cn:890/',
        // target: 'http://172.16.40.174:8082/',
        // target: 'http://dev.erp.yktour.com.cn/',
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
        // target: 'http://localbom.com/',
        target: 'https://testerp.yktour.com.cn/',   // 测试服
        // target: 'http://dev.erp.yktour.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
