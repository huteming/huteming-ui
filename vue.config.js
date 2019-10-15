const path = require('path')
const globImporter = require('node-sass-glob-importer')
const gitsha = require('child_process').execSync('git rev-parse HEAD').toString().trim()

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

// 设置应用环境变量
process.env.VUE_APP_RELEASE = gitsha

module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 80,
    },

    configureWebpack: {
        resolve: {
            alias: {
                // 'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'web': resolve('./packages'),
                'web-ui': resolve('./packages/@ui'),
                'web-util': resolve('./packages/@util'),
                'web-cli': resolve('./packages/@cli'),
            },
        },
        externals: {
            'axios': 'axios',
        },
    },

    chainWebpack: config => {
        /**
         * 读取 md 文件
         * https://github.com/QingWei-Li/vue-markdown-loader
         */
        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader(path.resolve(__dirname, './build/md-loader/index.js'))

        /**
         * fix 热更新失败
         * https://github.com/vuejs/vue-cli/issues/1559
         */
        config.resolve
            .symlinks(true)
    },

    css: {
        extract: process.env.BUILD_MODE !== 'lib',

        loaderOptions: {
            /**
             * 文档
             * sass-loader: https://github.com/webpack-contrib/sass-loader
             * node-sass: https://github.com/sass/node-sass
             */
            sass: {
                sassOptions: {
                    // data: `@import "web/assets/scss/index.scss";`
                    importer: globImporter(),
                },
            },
        },
    },

    productionSourceMap: false,
}
