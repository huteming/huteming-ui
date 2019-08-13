#!/usr/bin/env node

/* eslint-disable */
'use strict';

// Build a entry less file to dist/antd-mobile.less
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

function isFile (path) {
    return fs.statSync(path).isFile()
}

function resolve (dir) {
    return path.join(process.cwd(), 'packages', dir)
}

function createThemeEntry (theme) {
    let base = 'huteming-ui'
    if (theme) {
        base += `-${theme}`
    }
    fs.writeFileSync(
        resolve(`ui/dist/${base}.scss`),
        '@import "../lib/style/common.scss";\n' +
        `@import "../lib/style/themes/${theme || 'default'}.scss";\n` +
        '@import "../lib/style/components.scss";\n'
    )
}

// 复制 style 目录
const targetDir = resolve('ui/lib/style')
shell.rm('-rf', `${targetDir}/*`)
shell.cp('-Rf', `${resolve('@ui/style')}/*`, `${targetDir}/`)

if (fs.existsSync(resolve('ui/dist'))) {
    console.log('Building a entry scss file to packages/ui/dist/huteming-ui.scss')
    const componentsPath = resolve('ui/lib/style/components')
    let componentsLessContent = ''

    // 将所有样式打包到 ui/lib/style/components.scss
    fs.readdir(componentsPath, (err, files) => {
        files.forEach(file => {
            componentsLessContent += `@import "./components/${file}";\n`
        })
        fs.writeFileSync(resolve('ui/lib/style/components.scss'), componentsLessContent)
    })

    // 生成默认主题入口文件: dist/huteming-ui.scss
    createThemeEntry()

    // 生成其他主题入口文件: dist/huteming-ui-other.scss
    createThemeEntry('other')
}
