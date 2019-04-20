const Git = require('./git')
const path = require('path')
const shell = require('shelljs')
const { ProcessError } = require('./custom_error.js')

exports.execCmd = function (cmd) {
    return new Promise((resolve, reject) => {
        shell.exec(cmd, { silent: true }, function (code, stdout, stderr) {
            if (code === 0) {
                return resolve(stdout)
            }
            const msg = stderr || 'Process failed: ' + code
            reject(new ProcessError(code, msg))
        })
    })
}

exports.getUser = function (cwd, options = {}) {
    if (options.user) {
        return Promise.resolve(options.user)
    }

    return Promise.all([
        new Git(cwd).exec('config', 'user.name'),
        new Git(cwd).exec('config', 'user.email')
    ])
        .then(([name, email]) => {
            return {
                name: name.output.trim(),
                email: email.output.trim()
            }
        })
        .catch(err => {
            return null
        })
}

exports.getRepo = function (cwd, options = {}) {
    if (options.repo) {
        return Promise.resolve(options.repo)
    }

    const git = new Git(cwd)
    return git.getRemoteUrl(options.remote)
}

exports.getCacheDir = function () {
    return path.relative(process.cwd(), path.resolve(__dirname, '../.cache'))
}
