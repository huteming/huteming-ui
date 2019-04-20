const path = require('path')
const assert = require('../helper').assert
const utils = require('../../lib/utils')
const { ProcessError } = require('../../lib/custom_error')
const ghPages = require('../../lib/')
const helper = require('../helper')

const fixtures = path.join(__dirname, '../integration/fixtures')
const fixtureName = 'basic'

beforeEach(() => {
    ghPages.clean()
})

describe('utils', () => {
    describe('execCmd', () => {
        it('gets the stdout', done => {
            const str = 'hello'

            utils.execCmd(`echo ${str}`)
                .then(stdout => {
                    assert.equal(stdout.replace('\n', '').replace('\r', ''), str)
                    done()
                })
                .catch(done)
        })

        it('gets the ProcessError', done => {
            utils.execCmd('echooooo "hello"')
                .then(() => {
                    done(new Error('expect throw a Error'))
                })
                .catch(err => {
                    if (err instanceof ProcessError) {
                        done()
                        return
                    }
                    done(new Error('expect instanceof ProcessError'))
                })
        })
    })

    describe('getUser', () => {
        it('gets the locally configured user', done => {
            const name = 'Full Name';
            const email = 'email@example.com';

            helper.setupRepo('basic', {user: { name, email }})
                .then(dir => {
                    utils
                        .getUser(dir)
                        .then(user => {
                            assert.equal(user.name, name)
                            assert.equal(user.email, email)
                            done()
                        })
                        .catch(done)
                })
        })

        it('gets the locally options user', async () => {
            const name = 'Full Name'
            const email = 'email@example.com'

            const user = await utils.getUser('', { user: { name, email } })
            assert.equal(user.name, name)
            assert.equal(user.email, email)
        })
    })

    describe('getRepo', () => {
        it('gets the locally configured repo', done => {
            const local = path.join(fixtures, fixtureName, 'local')
            const branch = 'gh-pages'

            helper.setupRemote('basic', { branch })
                .then(({ url, dir }) => {
                    const options = {
                        repo: url,
                        user: {
                            name: 'User Name',
                            email: 'user@email.com'
                        }
                    }
                    ghPages.publish(local, options, (err, dir) => {
                        if (err) {
                            return done(err)
                        }

                        utils.getRepo(dir, { remote: 'origin' })
                            .then(repo => {
                                assert.equal(url, repo)
                                done()
                            })
                            .catch(done)
                    })
                })
                .catch(done)
        })

        it('gets the locally options repo', async () => {
            const url = 'file://'

            const repo = await utils.getRepo('', { repo: url })

            assert.equal(url, repo)
        })
    })

    describe('getCacheDir', () => {
        it('gets the cache dir', () => {
            const dir = utils.getCacheDir()
            assert.equal('.cache', path.basename(dir))
        })
    })
})
