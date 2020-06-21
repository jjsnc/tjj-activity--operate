
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// 获取当前活动
let pageEnv = process.argv.filter(item => item.indexOf('page=') > -1)[0] ? process.argv.filter(item => item.indexOf('page=') > -1)[0] : 'tjj'
let _PAGE = pageEnv.replace('page=', '');

// 获取版本
let vEnv = process.argv.filter(item => item.indexOf('version=') > -1)[0] ? process.argv.filter(item => item.indexOf('version=') > -1)[0] : ''
let _version = vEnv.replace('version=', '');

// 当前打包环境
let env = '';
let __env = process.argv.filter(item => item.indexOf('--env=') > -1)[0] ? process.argv.filter(item => item.indexOf('--env=') > -1)[0] : ''
env = __env ? __env.replace('--env=', '') : '';

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/apiHost': {
                // target: 'http://m.taojiji.com', // 本地
                // target: 'http://a.taojiji.com', // 开发环境
                 target: 'https://a.tjjshop.cn', // 测试服
//              target: 'https://a.taojiji.com', // 正式
                changeOrigin: true,
                pathRewrite: {
                    '^/apiHost': ''
                }
            },
            //fissilexiangmu
            '/apiFissileHost': {
                // target: 'http://m.taojiji.com', // 本地
                // target: 'http://a.taojiji.com', // 开发环境
                // target: 'http://api-fissile.tjjshop.cn', // 测试服
                target: 'https://api-fissile.taojiji.com', // 正式
                changeOrigin: true,
                pathRewrite: {
                    '^/apiFissileHost': ''
                }
            },
            '/apiJavaHost': {
                // target: 'http://m.taojiji.com', // 本地
                // target: 'http://a.taojiji.com', // 开发环境
             target: 'https://api.tjjshop.cn', // 测试服
             //   target: 'https://api.taojiji.com', // 正式
                changeOrigin: true,
                pathRewrite: {
                    '^/apiJavaHost': ''
                }
            },
            // 超省新菜单接口
            '/apiSuperHost': {
                // target: 'http://m.taojiji.com', // 本地
                // target: 'http://a.taojiji.com', // 开发环境
                // target: 'http://fissile.tjjshop.cn', // 测试服
                target: 'https://fissile.taojiji.com', // 正式
                changeOrigin: true,
                pathRewrite: {
                    '^/apiSuperHost': ''
                }
            },
            // 超省新java接口
            '/apiSuperJavaHost': {
                // target: 'http://m.taojiji.com', // 本地
                // target: 'http://a.taojiji.com', // 开发环境
                // target: 'https://api.tjjshop.cn', // 测试服
                target: 'https://api.taojiji.com', // 正式
                changeOrigin: true,
                pathRewrite: {
                    '^/apiSuperJavaHost': ''
                }
            },
        },


        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 3033, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: process.env.NODE_ENV === 'production' ? `D:\\yy\\activity\\project\\${_PAGE}${_version?'\\'+_version:''}\\view\\index.html` : path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: process.env.NODE_ENV === 'production' ? `D:\\yy\\static-fissile\\activity\\project\\${_PAGE}${_version?'\\'+_version:''}` : path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: (function () {
            let __path = '';

            switch (env) {
                case 'dev':
                    __path = './';
                    break;
                // case 'local':
                //     __path = `http://static.taojiji.com/activity/${_PAGE}/`;
                //     break;
                // case 'devTest':
                //     __path = `http://tjjstatic.taojiji.com/activity/${_PAGE}/`;
                //     break;
                case 'test':
                    __path = `https://static-fissile.tjjshop.cn/activity/project/${_PAGE}${_version?'/'+_version:''}/`;
                    break;
                case 'pro':
                    __path = `https://static-fissile.taojiji.com/activity/project/${_PAGE}${_version?'/'+_version:''}/`;
                    break;
                default:
                    __path = './';
                    break;
            }
            return __path;
        })(),

        /**
         * Source Maps
         */

        productionSourceMap: env !== 'pro',
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

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
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
