import assert from 'assert'

describe('ui entry', () => {
    const names = [
        {
            name: 'animation', // 整体打包模块名
            lib: 'animation', // 按需加载目录名
        },
        {
            name: 'api',
            lib: 'api',
        },
        {
            name: 'CanvasDraw',
            lib: 'canvas-draw',
        },
        {
            name: 'element',
            lib: 'element',
        },
        {
            name: 'ImageConvertor',
            lib: 'image-convertor',
        },
        {
            name: 'request',
            lib: 'request',
        },
        {
            name: 'Roller',
            lib: 'roller',
        },
        {
            name: 'Storage',
            lib: 'storage',
        },
        {
            name: 'tool',
            lib: 'tool',
        },
        {
            name: 'Validator',
            lib: 'validator',
        },
        {
            name: 'wxsdk',
            lib: 'wxsdk',
        },
    ]

    names.forEach(({ name, lib, child }) => {
        it(name, () => {
            // 整体打包入口
            const pack = require('web/util/index')
            const _module = pack[name]
            assert.ok(_module)

            // 按需加载入口
            const _lib = require(`web/util/lib/${lib}/index`)
            assert.ok(_lib.default)
        })
    })
})
