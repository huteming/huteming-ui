const helper = require('./helper')
// const path = require('path')
const Git = require('../../lib/index')
const assert = require('assert')

// const fixtures = path.join(__dirname, 'fixtures')

describe('git', () => {
    let git
    let pathRemote
    let pathRepo
    let shaOld

    before(async () => {
        const _pathRepo = await helper.setupRemote()
        const _pathRemote = await helper.clone(_pathRepo)
        const { sha } = await helper.init(_pathRemote)

        git = new Git(_pathRemote)
        pathRemote = _pathRemote
        pathRepo = _pathRepo
        shaOld = sha
    })

    it('getCurrentBranch', async () => {
        const nameBranch = 'basic'
        await git._exec('checkout', '-b', nameBranch)
        const _branch = await git.getCurrentBranch()

        assert.strictEqual(_branch.name, nameBranch)
    })

    it('getBranchCommit', async () => {
        const _message = 'Update Commit'
        const _nameBranch = 'basic2'
        const { message, sha } = await helper.commit(pathRemote, _nameBranch, _message)
        const _commit = await git.getBranchCommit(_nameBranch)

        assert.strictEqual(_commit.sha(), sha)
        assert.strictEqual(message, _message)
    })

    it('fetch', async () => {
        let _commit
        const _message = 'fetch Commit'
        const _pathRemote = await helper.clone(pathRepo)
        const { sha: shaNew } = await helper.commit(_pathRemote, 'master', _message, 'basic', false)
        await helper.push(_pathRemote, 'master')

        _commit = await git.getBranchCommit('origin/master')
        assert.strictEqual(_commit.sha(), shaOld)

        await git.fetch('origin')
        _commit = await git.getBranchCommit('origin/master')
        assert.strictEqual(_commit.sha(), shaNew)
    })
})
