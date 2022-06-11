const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    // publicPath:"./",
    // outputDir:"dist",
    // assetsDir:"static",
    lintOnSave: false,
    productionSourceMap: false, // 不生成map文件
    // configureWebpack: {
    //     output: {
    //         chunkFilename: 'js/[name].js'
    //     }
    // },
    configureWebpack:config=>{
        if(process.env.NODE_ENV !== 'production') // 开发环境不做处理
            return;

        config.plugins.push(
            new CompressionWebpackPlugin({
                algorithm: 'gzip', // 压缩格式
                test: /\.(js|css|svg|woff|ttf|json|html)$/, // 需要压缩的文件类型后缀/类型
                threshold: 10240, // 大于10K就压缩处理
                minRatio: 0.8, // 只有压缩率比这个值小的文件才会被处理，压缩率=压缩大小/原始大小，如果压缩后和原始文件大小没有太大区别，就不用压缩
                deleteOriginalAssets: false // 是否删除原文件，最好不删除，服务器会自动优先返回同名的.gzip资源，如果找不到还可以拿原始文件
            })
        );
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8088/api/v1",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}