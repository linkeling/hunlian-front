const isRrod = process.env.NODE_ENV === 'prod';
const date = new Date();
const Version = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours();
module.exports = {
    runtimeCompiler: true,
    indexPath: "index.html",
    publicPath: '/', // 设置打包文件相对路径
    outputDir: 'dist',
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints: false
        },
        output: { // 输出重构  打包编译后的 文件名称  【版本号】
            filename: `js/[name].${Version}.js`,
            chunkFilename: `js/[name].${Version}.js`,
        }
    },
    productionSourceMap: isRrod ? false : true,
    // devServer: {
    //     port: 8089,
    //     open: true,
    //     proxy: {  //配置跨域
    //         '/api': {
    //             target: 'http://123.56.183.13:8889',  //真实的后台接口
    //             changOrigin: true,  //允许跨域
    //             pathRewrite: {
    //                 /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
    //                   实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
    //                  */
    //                 '^/api': ''
    //             }
    //         },
    //         '/checkApi': {
    //             target: 'https://beta-yac.yiboshi.com',  //真实的后台接口
    //             changOrigin: true,  //允许跨域
    //             pathRewrite: {
    //                 '^/checkApi': ''
    //             }
    //         },
    //     }
    // },
    chainWebpack: (config) => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    }
}
