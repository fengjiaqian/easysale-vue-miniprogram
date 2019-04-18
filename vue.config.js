/**
 * created by yuanzishu 2019/04/04
 */
//const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/stylus/variable.styl'),
            ],
        })
}

module.exports = {
    publicPath: '', // 默认'/'，部署应用包时的基本 URL
    outputDir: 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map

    configureWebpack: config => {
        // config.externals = {
        //   'vue': 'Vue',
        //   'vue-router': 'VueRouter',
        //   'vuex': 'Vuex',
        //   'axios': 'axios'
        // }
        const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true, //console
                            drop_debugger: true,
                            pure_funcs: ['console.log'] //移除console
                        }
                    }
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
    },
    chainWebpack: config => {

        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    },
    css: {
        modules: false,
        extract: IS_PROD, //IS_PROD ==>true
        sourceMap: false,
        loaderOptions: {}
    },
    pluginOptions: {

    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    devServer: {
        open: !IS_PROD,
        host: '0.0.0.0',
        port: 9999,
        https: false,
        historyApiFallback: true,
        hotOnly: true,
        disableHostCheck: true,
        proxy: {
            // '/ua': {
            //     target: 'http://ua2.release.yijiupidev.com/himalaya-ApiService-UA2/',
            //     changeOrigin: true,
            //     ws: false,
            //     pathRewrite: { '^/ua': '' }
            // },
            '/': {
                // target: 'http://192.168.0.25:5201/', //lidengfeng
                // target: 'http://192.168.0.221:5201/', //chenchuxiang
               // target: 'http://192.168.0.133:5201/', //dev
                  target: 'http://192.168.0.74:5201/', //lilijuan
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            },

        }
    }
};