const { src, dest, series } = require('gulp')
const del = require('del')
const through = require('through2')
const Vinyl = require('vinyl')
const fs = require('fs')

// 清除 style 文件
function clean () {
    return del([
        'packages/ui/lib/style/**',
    ])
}

// 创建 style 文件
function copy () {
    return src(['packages/@ui/style/**', '!packages/@ui/style/**/components.scss'])
        .pipe(dest('packages/ui/lib/style/'))
}

// 创建模块统一入口文件
function createModuleEntry () {
    return src('packages/ui/lib/style/components/*')
        /**
         * file对象
         * @param {String} relative 相对路径 actionsheet.scss
         * @param {String} path 完整路径 E:\tommy\web-common\packages\ui\lib\style\components\actionsheet.scss
         */
        .pipe(through.obj(function (file, enc, cb) {
            this.push(new Vinyl({
                base: './packages/ui/lib/style/',
                path: './packages/ui/lib/style/components.scss',
                contents: Buffer.from(`@import "./components/${file.relative}";\n`)
            }))
            cb()
        }))
        .pipe(dest('packages/ui/lib/style/', { append: true }))
}

// 在 ui 打包目录 dist 中创建主题样式入口文件 huteming-ui.scss
function createThemeEntry (done) {
    fs.writeFile(
        'packages/ui/dist/huteming-ui.scss',
        `@import "../lib/style/themes/default.scss";\n` +
        '@import "../lib/style/common.scss";\n' +
        '@import "../lib/style/components.scss";\n',
        done
    )
}

exports.default = series(clean, copy, createModuleEntry, createThemeEntry)
