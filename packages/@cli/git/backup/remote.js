const { Controller } = require('../tools/utils')

module.exports = class Remote extends Controller {
    constructor (remote) {
        super(this)

        this.remote = remote
    }

    /**
     * 获取远程地址
     * @return {Promise} A promise
     */
    url () {
        const _url = await this._exec('config', '--get', `remote.${this.remote}.url`)

        return _url
    }
}
