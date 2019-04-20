const { Controller } = require('../tools/utils')

class Remote extends Controller {
    constructor (cwd, remote) {
        super(cwd)

        this.remote = remote
    }

    /**
     * 获取远程地址
     * @return {Promise} A promise
     */
    async url () {
        const _url = await this._exec('config', '--get', `remote.${this.remote}.url`)

        return _url
    }
}

module.exports = Remote
