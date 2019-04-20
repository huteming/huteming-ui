const { ProcessError } = require('./custom_error.js')
const cp = require('child_process')

exports.Controller = class {
    constructor (cwd) {
        this._cwd = cwd || process.cwd()
        this.output = ''
    }

    cwd () {
        return this._cwd
    }

    /**
     * 执行命令
     * @param {string} args 命令行参数
     * @return {Promise} A promise. 会返回命令输出
     */
    async _exec (...args) {
        this.output = await spawn('git', args, this._cwd)

        return this.output
    }
}

/**
 * 子进程 spawn 的 promise 实现
 * @param {string} exe 系统命令
 * @param {Array.<string>} args 命令行参数数组
 * @param {string} cwd 工作目录
 * @return {Promise}
 */
function spawn (exe, args, cwd) {
    return new Promise((resolve, reject) => {
        const child = cp.spawn(exe, args, {
            cwd,
        })
        const buffer = []

        child.stderr.on('data', chunk => {
            buffer.push(chunk.toString())
        })
        child.stdout.on('data', chunk => {
            buffer.push(chunk.toString())
        })
        child.on('close', code => {
            const output = buffer.join('').split(/[\n\r]/).shift()
            if (code) {
                const msg = output || 'Process failed: ' + code
                reject(new ProcessError(code, msg))
                return
            }

            resolve(output)
        })
    })
}
