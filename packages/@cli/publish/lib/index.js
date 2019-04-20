const fs = require('fs')
const fse = require('fs-extra')
const moment = require('moment')
const path = require('path')
const globby = require('globby')
const filenamify = require('filenamify-url')
const { getCacheDir, getRepo, getUser } = require('./utils')
const Git = require('./git')
const util = require('util')

const log_info = util.debuglog('info')
const log_error = util.debuglog('error')

/**
 */
exports.publish = async function (basePath, options, callback) {
    if (typeof options === 'function') {
        callback = options
        options = {}
    }

    const defaults = {
        dest: '.',
        add: false,
        git: 'git',
        depth: 1,
        dotfiles: false,
        branch: 'gh-pages',
        remote: 'origin',
        src: '**/*',
        only: '.',
        push: true,
        message: `update at ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        silent: false,
    }

    options = Object.assign({}, defaults, options)

    if (!callback) {
        callback = function (err, dir) {
            if (err) {
                log_error(err.message)
            }
        }
    }

    function done (err, dir) {
        try {
            callback(err, dir)
        } catch (err2) {
            log_error('Publish callback threw: %s', err2.message)
        }
    }

    try {
        const files = globby
            .sync(options.src, {
                cwd: basePath, // 要搜索的当前工作目录
                dot: options.dotfiles, // 允许模式匹配以句点（文件和目录）开头的文件名，即使模式在该点中没有明确的句点
            })
            .filter(file => {
                return !fs.statSync(path.join(basePath, file)).isDirectory()
            })

        if (!Array.isArray(files) || files.length === 0) {
            throw new Error('The pattern in the "src" property didn\'t match any files.')
        }

        const repoUrl = await getRepo(process.cwd(), options)
        const cloneUrl = path.join(getCacheDir(), filenamify(repoUrl))

        log_info(`Cloning ${repoUrl} into ${cloneUrl}`)

        const git = await Git.clone(repoUrl, cloneUrl, options)

        // clean
        log_info('Cleaning')
        await git.clean()

        // fetch
        log_info(`Fetching ${options.remote}`)
        await git.fetch(options.remote)

        // checkout
        log_info(`Checkouting out ${options.remote}/${options.branch}`)
        await git.checkout(options.remote, options.branch)

        // remote
        if (!options.add) {
            log_info('Removing files')
            await git.rm(path.join('.', options.dest))
        }

        // copy
        log_info(`Copying files`)
        await fse.copy(basePath, path.join(cloneUrl, options.dest), {
            filter (src, dest) {
                if (!path.extname(src)) {
                    return true
                }

                return files.find(item => item.indexOf(path.basename(src)) > -1)
            },
        })

        // add
        log_info(`Adding all`)
        await git.add('.')

        // config user
        const user = await getUser(cloneUrl, options)
        if (user) {
            await Promise.all([
                git.exec('config', 'user.email', user.email),
                git.exec('config', 'user.name', user.name),
            ])
        }

        // commit
        log_info(`Committing`)
        await git.commit(options.message)

        // tag
        if (options.tag) {
            log_info('Tagging')
            try {
                await git.tag(options.tag)
            } catch (err) {
                log_error(err)
                log_error('Tagging failed, continuing')
            }
        }

        // push
        log_info(`Pushing`)
        await git.push(options.remote, options.branch)

        // done
        log_info(`done`)
        done(null, cloneUrl)
    } catch (err) {
        done(err)
    }
}

/**
 * Clean the cache directory.
 */
exports.clean = function clean () {
    fse.removeSync(getCacheDir())
}
