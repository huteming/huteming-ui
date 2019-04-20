const tmp = require('tmp')
const path = require('path')
const fs = require('fs-extra')
const Git = require('../../lib/index')
const os = require('os')

/**
 * Turn off maxListeners warning during the tests
 * See: https://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n
 */
require('events').EventEmitter.prototype._maxListeners = 0

const fixtures = path.join(process.cwd(), 'tests', 'unit', '.fixtures')

function mkdtemp () {
    return new Promise((resolve, reject) => {
        tmp.dir({ unsafeCleanup: true, dir: os.tmpdir(), keep: false, prefix: 'cli-' }, (err, tmpPath) => {
            // console.log(tmpPath)
            if (err) {
                return reject(err)
            }
            resolve(tmpPath)
        })
    })
}

// function mkdfile () {
//     return new Promise((resolve, reject) => {
//         tmp.file({ unsafeCleanup: true, dir: os.tmpdir() }, (err, path, fd) => {
//             if (err) {
//                 return reject(err)
//             }

//             console.log('File: ', path)
//             console.log('Filedescriptor: ', fd)

//             resolve(path)
//         })
//     })
// }

async function setupRemote () {
    const pathRepo = await mkdtemp()
    const repo = new Git(pathRepo)
    await repo.init(true)

    return pathRepo
}

async function clone (pathRepo) {
    const dir = await mkdtemp()
    const git = new Git(dir)

    await git._exec('clone', pathRepo)
    const pathRemote = path.join(dir, path.basename(pathRepo))

    return pathRemote
}

async function init (pathRemote) {
    const res = await commit(pathRemote, 'master', 'Initial commit', 'hello')
    await push(pathRemote, 'master')

    return res
}

async function commit (pathRemote, branchname, message = 'Initial commit', dirname = 'other', createBranch = true) {
    const git = new Git(pathRemote)

    // if (init) {
    // await git._exec('branch', branchname)
    // }
    if (createBranch) {
        await git._exec('checkout', '-b', branchname)
    } else {
        await git._exec('checkout', branchname)
    }

    const dir = await mkdtemp()
    const fixturePath = path.join(fixtures, dirname)
    await fs.copy(fixturePath, dir)
    await fs.copy(dir, pathRemote)

    await git._exec('add', '.')
    await git._exec('commit', '-m', message)
    const sha = await git._exec('rev-parse', branchname)

    return { message, sha }
}

async function push (repo, branchname) {
    const git = new Git(repo)

    await git._exec('push', 'origin', branchname)

    return repo
}

exports.setupRemote = setupRemote
exports.clone = clone
exports.init = init
exports.commit = commit
exports.push = push
