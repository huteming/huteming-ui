const { Controller } = require('../tools/utils')
// const fs = require('fs-extra')
// const path = require('path')
// const Remote = require('./remote')
const Branch = require('./branch')
const Commit = require('./commit')

/**
 * @param {string} cwd 工作目录
 */
class Git extends Controller {
    // constructor () {
    //     super(...arguments)
    // }

    /**
     * 初始化仓库
     * @return {Promise} A promise.
     */
    init (isBare) {
        const args = ['init']
        if (isBare) {
            args.push('--bare')
        }
        return this._exec(...args)
    }

    /**
     * 获取当前分支
     */
    async getCurrentBranch () {
        const _branch = await this._exec('rev-parse', '--abbrev-ref', 'HEAD')

        const _branchInstance = new Branch(this.cwd(), _branch)

        return _branchInstance
    }

    /**
     * 获取 commit 列表
     */
    async getBranchCommit (name) {
        const _commit = await this._exec('rev-parse', name)
        const _commitInstance = new Commit(this.cwd(), _commit)

        return _commitInstance
    }

    async fetch (remote) {
        await this._exec('fetch', remote)
    }
}

module.exports = Git
