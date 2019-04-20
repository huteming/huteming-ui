const helper = require('../helper')
const ghPages = require('../../lib/')
const path = require('path')
const { promisify } = require('util')

const fixtures = path.join(__dirname, 'fixtures')
const fixtureName = 'basic'

beforeEach(() => {
    ghPages.clean()
})

describe('basic usage', () => {
    it('pushes the contents of a directory to a gh-pages branch', async () => {
        const local = path.join(fixtures, fixtureName, 'local')
        const expected = path.join(fixtures, fixtureName, 'expected')
        const branch = 'gh-pages'

        const { url, dir } = await helper.setupRemote(fixtureName, { branch })
        const options = {
            repo: url,
            user: {
                name: 'User Name',
                email: 'user@email.com'
            }
        }
        const res = await promisify(ghPages.publish)(local, options)
        await helper.assertContentsMatch(expected, url, branch)
    })

    it('can push to a different branch', done => {
        const local = path.join(fixtures, fixtureName, 'local')
        const branch = 'master'

        helper.setupRemote(fixtureName, { branch })
            .then(({ url, dir }) => {
                const options = {
                    repo: url,
                    branch: branch,
                    user: {
                        name: 'User Name',
                        email: 'user@email.com'
                    }
                }
                ghPages.publish(local, options, err => {
                    if (err) {
                        return done(err);
                    }
                    helper
                        .assertContentsMatch(local, url, branch)
                        .then(() => done())
                        .catch(done);
                })
            })
    })
})
