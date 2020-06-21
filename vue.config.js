// vue.config.js 配置说明
module.exports = {
    // 打包时静态资源文件路径
    baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',

    // 在npm run build时 生成文件的目录
    outputDir: 'D:/wamp/www/text_file',

    // 静态资源输出文件目录
    assetsDir: 'static',

    // index.html输出文件目录
    indexPath: 'HTML/index.html',

    // 
    devServer: {
        port: 3000, // 端口号
        host: '192.168.100.211',
        https: true, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            // '/api': {
            //     target: '<url>',
            //     ws: true,
            //     changeOrigin: true
            // },
            // '/foo': {
            //     target: '<other_url>'
            // }
        },  // 配置多个代理
    }
}