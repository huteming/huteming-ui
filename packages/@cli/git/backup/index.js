const { Controller } = require('../tools/utils')
const fs = require('fs-extra')
const path = require('path')
const Remote = require('./remote')

/**
 * @param {string} cwd 工作目录
 */
class Git extends Controller {
    /**
     * 克隆仓库到指定目录。如果目录已存在，直接返回该目录 实例
     * @param {string} repo 仓库地址
     * @param {string} dir 仓库目录
     * @return {Promise} A promise.
     */
    async clone (repo, dir) {
        const exists = await fs.exists(dir)

        if (exists) {
            return Promise.resolve()
        }

        await fs.mkdirp(path.dirname(path.resolve(dir)))
        await this._exec('clone', repo, dir)

        const remote = new Remote('origin')
        const url = await remote.url()

        if (url !== repo) {
            throw new Error(`Remote url mismatch.  Got "${url}". but expected "${repo}"`)
        }
    }

    /**
     * @return {Promise} A promise.
     */
    clean () {
        return this._exec('clean', '-f', '-d')
    }

    /**
     * @return {Promise} A promise.
     */
    reset () {
        return this._exec('reset', '--hard', `HEAD`)
    }

    /**
     * @param {string} remote Remote alias.
     * @return {Promise} A promise.
     */
    fetch (remote) {
        return this._exec('fetch', remote)
    }

    /**
     * @param {string} remote Remote alias.
     * @param {string} branch Branch name.
     * @return {Promise} A promise.
     */
    checkout (remote, branch) {
        return this._exec('ls-remote', '--exit-code', '.', `${remote}/${branch}`)
            // branch exists on remote, hard reset
            .then(() => {
                return this._exec('checkout', branch)
            })
            .then(() => {
                return this.clean()
            })
            .then(() => {
                return this.reset(remote, branch)
            })
            .catch(error => {
                // branch doesn't exist, create an orphan
                if (error instanceof ProcessError && error.code === 2) {
                    return this._exec('checkout', '--orphan', branch)
                } else {
                    // unhandled error
                    throw error
                }
            })
    }

    /**
     * Remove all unversioned files.
     * @param {string} files Files argument.
     * @return {Promise} A promise.
     */
    rm (files) {
        return this._exec('rm', '--ignore-unmatch', '-r', '-f', files)
    }

    /**
     * Add files.
     * @param {string} files Files argument.
     * @return {Promise} A promise.
     */
    add (files) {
        return this._exec('add', files)
    }

    /**
     * Commit (if there are any changes).
     * @param {string} message Commit message.
     * @return {Promise} A promise.
     */
    commit (message) {
        return this._exec('diff-index', '--quiet', 'HEAD').catch(() =>
            this._exec('commit', '-m', message)
        )
    }

    /**
     * Add tag
     * @param {string} name Name of tag.
     * @return {Promise} A promise.
     */
    tag (name) {
        return this._exec('tag', name)
    }

    /**
     * Push a branch.
     * @param {string} remote Remote alias.
     * @param {string} branch Branch name.
     * @return {Promise} A promise.
     */
    push (remote, branch) {
        return this._exec('push', '--tags', remote, branch)
    }
}

module.exports = Git
