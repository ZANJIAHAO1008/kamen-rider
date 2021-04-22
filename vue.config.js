

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    indexPath: 'index.html',
    filenameHashing: true,
    lintOnSave: false,
    configureWebpack:{
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'plugins': '@/plugins',
            }
        }
    },
    devServer: {
        open: true,
        disableHostCheck:true,
        proxy: {
            '/api': {
                target: 'http://146.56.235.246:8081/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'http://146.56.235.246:8081/',
                },
            },
        }
    }
}