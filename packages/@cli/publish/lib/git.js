const cp = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const { ProcessError } = require('./custom_error.js')

/**
 * Util function for handling spawned processes as promises.
 * @param {string} exe Executable.
 * @param {Array.<string>} args Arguments.
 * @param {string} cwd Working directory.
 * @return {Promise} A promise.
 */
function spawn (exe, args, cwd) {
    return new Promise((resolve, reject) => {
        const child = cp.spawn(exe, args, {
            cwd: cwd || process.cwd()
        })
        const buffer = []

        child.stderr.on('data', chunk => {
            buffer.push(chunk.toString())
        })
        child.stdout.on('data', chunk => {
            buffer.push(chunk.toString())
        })
        child.on('close', code => {
            const output = buffer.join('')
            if (code) {
                const msg = output || 'Process failed: ' + code
                reject(new ProcessError(code, msg))
            } else {
                resolve(output)
            }
        })
    })
}

/**
 * Create an object for executing git commands.
 * @param {string} cwd Repository directory.
 * @param {string} exe Git executable (full path if not already on path).
 */
module.exports = class Git {
    constructor (cwd, cmd) {
        this.cwd = cwd
        this.cmd = cmd || 'git'
        this.output = ''
    }

    /**
     * Execute an arbitrary git command.
     * @param {string} var_args Arguments (e.g. 'remote', 'update').
     * @return {Promise} A promise.  The promise will be resolved with this instance
     *     or rejected with an error.
     */
    exec () {
        return spawn(this.cmd, [].slice.call(arguments), this.cwd).then(output => {
            this.output = output
            return this
        })
    }
    
    /**
     * Initialize repository.
     * @return {Promise} A promise.
     */
    init () {
        return this.exec('init')
    }
    
    /**
     * Clean up unversioned files.
     * @return {Promise} A promise.
     */
    clean () {
        return this.exec('clean', '-f', '-d')
    }
    
    /**
     * Hard reset to remote/branch
     * @param {string} remote Remote alias.
     * @param {string} branch Branch name.
     * @return {Promise} A promise.
     */
    reset (remote, branch) {
        return this.exec('reset', '--hard', `${remote}/${branch}`)
    }
    
    /**
     * Fetch from a remote.
     * @param {string} remote Remote alias.
     * @return {Promise} A promise.
     */
    fetch (remote) {
        return this.exec('fetch', remote)
    }

    /**
     * Checkout a branch (create an orphan if it doesn't exist on the remote).
     * @param {string} remote Remote alias.
     * @param {string} branch Branch name.
     * @return {Promise} A promise.
     */
    checkout (remote, branch) {
        return this.exec('ls-remote', '--exit-code', '.', `${remote}/${branch}`)
            // branch exists on remote, hard reset
            .then(() => {
                return this.exec('checkout', branch)
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
                    return this.exec('checkout', '--orphan', branch)
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
        return this.exec('rm', '--ignore-unmatch', '-r', '-f', files)
    }

    /**
     * Add files.
     * @param {string} files Files argument.
     * @return {Promise} A promise.
     */
    add (files) {
        return this.exec('add', files)
    }

    /**
     * Commit (if there are any changes).
     * @param {string} message Commit message.
     * @return {Promise} A promise.
     */
    commit (message) {
        return this.exec('diff-index', '--quiet', 'HEAD').catch(() =>
            this.exec('commit', '-m', message)
        )
    }

    /**
     * Add tag
     * @param {string} name Name of tag.
     * @return {Promise} A promise.
     */
    tag (name) {
        return this.exec('tag', name)
    }

    /**
     * Push a branch.
     * @param {string} remote Remote alias.
     * @param {string} branch Branch name.
     * @return {Promise} A promise.
     */
    push (remote, branch) {
        return this.exec('push', '--tags', remote, branch)
    }

    /**
     * Get the URL for a remote.
     * @param {string} remote Remote alias.
     * @return {Promise<string>} A promise for the remote URL.
     */
    getRemoteUrl (remote) {
        return this.exec('config', '--get', `remote.${remote}.url`)
            .then(git => {
                const repo = git.output && git.output.split(/[\n\r]/).shift()
                if (repo) {
                    return repo
                } else {
                    throw new Error(
                        'Failed to get repo URL from options or current directory.'
                    )
                }
            })
            .catch(err => {
                throw new Error(
                    'Failed to get remote.' +
                    remote +
                    '.url (task must either be ' +
                    'run in a git repository with a configured ' +
                    remote +
                    ' remote ' +
                    'or must be configured with the "repo" option).'
                )
            })
    }

    /**
     * Clone a repo into the given dir if it doesn't already exist.
     * @param {string} repo Repository URL.
     * @param {string} dir Target directory.
     * @param {options} options All options.
     * @return {Promise<Git>} A promise.
     */
    static async clone (repo, dir, options) {
        const exists = await fs.exists(dir)
    
        if (exists) {
            return Promise.resolve(new Git(dir, options.git))
        }

        await fs.mkdirp(path.dirname(path.resolve(dir)))
    
        try {
            const args = [
                'clone',
                repo,
                dir,
                '--branch',
                options.branch,
                '--single-branch',
                '--origin',
                options.remote,
                '--depth',
                options.depth
            ]
            await spawn(options.git, args)
        } catch (err) {
            // try again without banch or depth options
            const args = [
                'clone',
                repo,
                dir,
                '--origin',
                options.remote,
            ]
            await spawn(options.git, args)
        }

        const git = await new Git(dir, options.git)
        const url = await git.getRemoteUrl(options.remote)
        if (url !== repo) {
            const message =
                'Remote url mismatch.  Got "' +
                url +
                '" ' +
                'but expected "' +
                repo +
                '" in ' +
                git.cwd +
                '.  Try running the `gh-pages-clean` script first.'
            throw new Error(message)
        }
        return git
    }
}
