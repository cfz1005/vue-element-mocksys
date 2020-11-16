module.exports = {
    // publicPath:"./",
    // outputDir:"dist",
    // assetsDir:"static",
    productionSourceMap: false, // 不生成map文件
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