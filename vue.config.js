const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require("path");
const webpack = require("webpack");
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                //定义主题
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                },
                //javascript
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .exclude
            .add(/node_modules/)
            .end()
            .test(/\.js$/)
            .use('babel-loader')
            .options({
                cacheDirectory: 'xieweivue'
            })
    },
    //大文件压缩打包到服务器中
    configureWebpack: config => {
        if (isProduction) {
            //提高首屏的加载速度
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }
    },
    //大大减少文件打包的时间
    filenameHashing: true,
    //开发环境中的接口代理
    devServer: {
        proxy: {
            '/Api': {
                target: 'http://www.mussc.com',
                changeOrigin: true
            }
        }
    },
    // 不生成map文件加快构建速度
    productionSourceMap: false,
    publicPath: './',
    //项目打包生成目录
    outputDir: 'mydesign',
    //js css image font的放置目录 相对于outputDir
    assetsDir: 'assets',
    //项目的入口文件 相对于outputDir
    indexPath: 'index.html'
}