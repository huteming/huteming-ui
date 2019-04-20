const log4js = require('log4js')
const path = require('path')

function resolve (filename) {
    return path.resolve(process.env.HOME, 'codePack', filename)
}

log4js.configure({
    appenders: {
        out: { type: 'stdout', layout: { type: 'basic', } },
        all: { type: 'file', filename: resolve('all.log') },
        // trace: { type: 'file', filename: resolve('test_trace.log') },
        // debug: { type: 'file', filename: resolve('test_debug.log') },
        // info: { type: 'file', filename: resolve('info.log') },
        // warn: { type: 'file', filename: 'test_warn.log' },
        // error: { type: 'file', filename: resolve('error.log') },
        // fatal: { type: 'file', filename: resolve('test_fatal.log') },
        test: { type: 'file', filename: resolve('test.log') },
        online: { type: 'file', filename: resolve('online.log') },
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'trace',
        },
        all: {
            appenders: ['all'],
            level: 'trace',
        },
        // trace: {
        //     appenders: ['trace', 'all', 'out'],
        //     level: 'trace',
        // },
        // debug: {
        //     appenders: ['debug', 'all', 'out'],
        //     level: 'trace'
        // },
        // info: {
        //     appenders: ['info', 'all', 'out'],
        //     level: 'trace'
        // },
        // warn: {
        //     appenders: ['warn', 'all', 'out'],
        //     level: 'trace'
        // },
        // error: {
        //     appenders: ['error', 'all', 'out'],
        //     level: 'trace'
        // },
        // fatal: {
        //     appenders: ['fatal', 'all', 'out'],
        //     level: 'trace'
        // },
        test: {
            appenders: ['test', 'all', 'out'],
            level: 'trace',
        },
        online: {
            appenders: ['online', 'all', 'out'],
            level: 'trace',
        },
    }
})

module.exports = function (type, file, msg) {
    if (file === 'front_end') {
        file = 'online'
    }
    const handler = log4js.getLogger(file)
    handler[type](msg)
}
