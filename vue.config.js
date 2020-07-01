module.exports = {
    // publishPath:"./",
    // outputDir:"dist",
    // assetsDir:"static",
    productionSourceMap:false,
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:8088/api/v1",
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}